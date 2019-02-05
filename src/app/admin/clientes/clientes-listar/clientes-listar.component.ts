import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';
import { LocalDataSource } from 'ng2-smart-table';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-clientes-listar',
  templateUrl: './clientes-listar.component.html',
  styleUrls: ['./clientes-listar.component.scss']
})
export class ClientesListarComponent implements OnInit {

  settings = {
    columns: {
      nombres: {
        title: 'NOMBRES',
        type: 'string',
      },
      apellidos: {
        title: 'APELLIDOS',
        type: 'string',
      },
      identificacion: {
        title: 'DOC. IDENT.',
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
      direccion: {
        title: 'DIRECCIÓN',
        type: 'text',
        editor: {
          type: 'textarea '
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
    this.apiRestSrv.getClienteTodos().then(
      (res: RespuestaApi) => {
        console.log(res.response);
        this.source.load(res.response);
      }, (err) => {
        console.error(err);

      }
    );
  }

  onDeleteConfirm(event) {
    if (window.confirm('¿Deseas eliminar este registro?')) {
      this.eliminarCliente(event.data._id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('¿Deseas guardar los cambios?')) {
      this.actualizarCliente(event.newData);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public actualizarCliente(data): void {
    this.apiRestSrv.updateCliente(data).then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.Alerta("success", "Cliente actualizado");
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

  public eliminarCliente(data): void {
    this.apiRestSrv.delCliente(data).then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.Alerta("success", "Cliente eliminado");
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
