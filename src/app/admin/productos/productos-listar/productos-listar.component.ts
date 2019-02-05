import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';
import { LocalDataSource } from 'ng2-smart-table';
import { CurrencyPipe } from '@angular/common';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-productos-listar',
  templateUrl: './productos-listar.component.html',
  styleUrls: ['./productos-listar.component.scss'],
  providers: [CurrencyPipe]
})
export class ProductosListarComponent implements OnInit {

  settings = {
    columns: {
      codigo: {
        title: 'CÓDIGO',
        type: 'string',
      },
      categoria: {
        title: 'CATEGORÍA',
        type: 'string',
      },
      nombre: {
        title: 'NOMBRE',
        type: 'string',
      },
      detalle: {
        title: 'DETALLE',
        type: 'string',
      },
      precio: {
        title: 'PRECIO',
        type: 'number',
        valuePrepareFunction: (precio) => { return this.currencyPipe.transform(precio); }
      },

      stock: {
        title: 'STOCK',
        type: 'number'
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
    private currencyPipe: CurrencyPipe,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.apiRestSrv.getProductoTodos().then(
      (res: RespuestaApi) => {
        this.source.load(res.response);
      }, (err) => {
        console.error(err);

      }
    );
  }

  onDeleteConfirm(event) {
    if (window.confirm('¿Deseas eliminar este registro?')) {
      this.eliminarProducto(event.data._id);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('¿Deseas guardar los cambios?')) {
      this.actualizarProducto(event.newData);
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  public actualizarProducto(data): void {
    this.apiRestSrv.updateProducto(data).then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.Alerta("success", "Producto actualizado");
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

  public eliminarProducto(data): void {
    this.apiRestSrv.delProducto(data).then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.Alerta("success", "Producto eliminado");
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
