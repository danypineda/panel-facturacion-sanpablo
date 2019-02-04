import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';

@Component({
  selector: 'app-productos-listar',
  templateUrl: './productos-listar.component.html',
  styleUrls: ['./productos-listar.component.scss']
})
export class ProductosListarComponent implements OnInit {

  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  columns = [
    { prop: 'codigo', summaryFunc: () => null },
    { prop: 'categoria', summaryFunc: () => null },
    { prop: 'nombre', summaryFunc: () => null },
    { prop: 'detalle', summaryFunc: () => null },
    { prop: 'precio', summaryFunc: () => null },
    { prop: 'stock', summaryFunc: () => null },
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private readonly apiRestSrv: ApiRestService,
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.apiRestSrv.getProductoTodos().then(
      (res: RespuestaApi) => {
        console.log(res.response);
        this.loadingIndicator = false;
        this.temp = [...res.response];
        this.rows = res.response;
      }, (err) => {
        console.error(err);

      }
    );
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    var returnData: any;
    // filter our data
    const temp = this.temp.filter(function (d) {

      returnData = false;

      if (d.nombre.toLowerCase().indexOf(val) !== -1 || !val) {
        returnData = d.nombre.toLowerCase().indexOf(val) !== -1 || !val;
      } else if (d.codigo.toLowerCase().indexOf(val) !== -1 || !val) {
        returnData = d.codigo.toLowerCase().indexOf(val) !== -1 || !val;

      }
      return returnData;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
