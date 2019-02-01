import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { Configuracion } from '../../../core/models/configuracion.model';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';

@Component({
  selector: 'app-ventas-agregar',
  templateUrl: './ventas-agregar.component.html',
  styleUrls: ['./ventas-agregar.component.scss']
})
export class VentasAgregarComponent implements OnInit {

  public configuracion = {} as Configuracion;

  listaClientes = [];
  clientesSettings = {};

  constructor(
    private readonly apiRestSrv: ApiRestService,
  ) {
    this.cargarConfiguracion();
  }

  private cargarConfiguracion(): void {
    this.apiRestSrv.getConfiguracionEmpresa().then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.configuracion = res.response;
            break;
          case 'fail':

            break;
        }
      }, (err) => {
        console.error('Cargar configuración', err);

      }
    );
  }

  ngOnInit() {
      this.apiRestSrv.getClienteTodos().then(
        (res: RespuestaApi) => {
          console.log(res.response);
          this.listaClientes = res.response;
        }, (err) => {
          console.error(err);
  
        }
      );

    this.clientesSettings = {
      singleSelection: true,
      idField: '_id',
      textField: 'nombres',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      enableCheckAll: false,
      searchPlaceholderText: 'Filtrar cliente'
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
