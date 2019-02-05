import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { LocalDataSource } from 'ng2-smart-table';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.scss']
})
export class UsuariosListarComponent implements OnInit {

  settings = {
    columns: {
      cedula: {
        title: 'CÉDULA',
        type: 'string',
      },
      nombres: {
        title: 'NOMBRES',
        type: 'string',
      },
      apellidos: {
        title: 'APELLIDOS',
        type: 'string',
      },
      email: {
        title: 'CORREO',
        type: 'string',
      },
      telefono: {
        title: 'TELÉFONO',
        type: 'string',
      },
      usuario: {
        title: 'USUARIO',
        type: 'text'
      },
      rol: {
        title: 'ROL',
        type: 'text',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'admin', title: 'Administrador' },
              { value: 'empleado', title: 'Empleado' }
            ]
          }
        }
      },
    },
    attr: {
      class: 'table table-hover table-dark'
    },
    actions: {
      columnTitle: 'Operaciones',
      add: false,
      position: 'right',
    },
    edit: {
      editButtonContent: 'Modificar ',
      saveButtonContent: 'Guardar',
      cancelButtonContent: 'Cancelar',
      confirmSave: true,
      inputClass: 'smart-table-input'
    },
    delete: {
      deleteButtonContent: 'Eliminar',
      confirmDelete: true,
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private readonly apiRestSrv: ApiRestService,
    private readonly alertService: AlertService,
  ) { }

  ngOnInit() {

    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.apiRestSrv.getUsuarioTodos().then(
      (res: RespuestaApi) => {
        this.source.load(res.response);
      }, (err) => {
        console.error(err);

      }
    );
  }

  onDeleteConfirm(event) {
    if (window.confirm('¿Deseas eliminar este registro?')) {
      this.eliminarUsuario(event.data._id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('¿Deseas guardar los cambios?')) {
      this.actualizarUsuario(event.newData);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public actualizarUsuario(data): void {
    this.apiRestSrv.updateUsuario(data).then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.Alerta("success", "Usuario actualizado");
            break;
          case 'fail':
            this.Alerta("error", "Oops, tuvimos un problema al actualizar el registro, inténtalo nuevamente.");
            break;
        }
      }, (err) => {
        this.Alerta("error", "Oops, tuvimos un problema al actualizar el registro, inténtalo nuevamente.");
      }
    );
  }

  public eliminarUsuario(data): void {
    this.apiRestSrv.delUsuario(data).then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.Alerta("success", "Usuario eliminado");
            break;
          case 'fail':
            this.Alerta("error", "Oops, tuvimos un problema al eliminar el registro, inténtalo nuevamente.");
            break;
        }
      }, (err) => {
        this.Alerta("error", "Oops, tuvimos un problema al eliminar el registro, inténtalo nuevamente.");
      }
    );
  }

  Alerta(tipo: string, mensaje: string) {

    switch (tipo) {
      case "error":
        this.alertService.danger(mensaje);
        break;
      case "warning":
        this.alertService.warning(mensaje);
        break;
      case "success":
        this.alertService.success(mensaje);
        break;
    }

  }

}
