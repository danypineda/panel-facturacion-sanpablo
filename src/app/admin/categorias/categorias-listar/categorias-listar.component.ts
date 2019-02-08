import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { AlertService } from 'ngx-alerts';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';

@Component({
  selector: 'app-categorias-listar',
  templateUrl: './categorias-listar.component.html',
  styleUrls: ['./categorias-listar.component.scss']
})
export class CategoriasListarComponent implements OnInit {

  settings = {
    columns: {
      nombre: {
        title: 'NOMBRE',
        type: 'string',
      },
      descripcion: {
        title: 'DESCRIPCIÓN',
        type: 'string',
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
    this.apiRestSrv.getCategoriaTodos().then(
      (res: RespuestaApi) => {
        this.source.load(res.response);
      }, (err) => {
        console.error(err);

      }
    );
  }

  onDeleteConfirm(event) {
    if (window.confirm('¿Deseas eliminar este registro?')) {
      this.eliminarCategoria(event.data._id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('¿Deseas guardar los cambios?')) {
      this.actualizarCategoria(event.newData);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public actualizarCategoria(data): void {
    this.apiRestSrv.updateCategoria(data).then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.Alerta("success", "Categoria actualizado");
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

  public eliminarCategoria(data): void {
    this.apiRestSrv.delCategoria(data).then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.Alerta("success", "Categoria eliminada");
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
