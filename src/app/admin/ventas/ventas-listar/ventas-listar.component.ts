import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';

@Component({
  selector: 'app-ventas-listar',
  templateUrl: './ventas-listar.component.html',
  styleUrls: ['./ventas-listar.component.scss']
})
export class VentasListarComponent implements OnInit {
  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  columns = [
    { prop: 'numFactura', summaryFunc: () => null },
    { prop: 'cliente.nombres'+'cliente.apellidos', summaryFunc: () => null },
    { prop: 'fecha', summaryFunc: () => null },
    { prop: 'total', summaryFunc: () => null },
    { prop: 'usuario', summaryFunc: () => null },
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private readonly apiRestSrv: ApiRestService,
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.apiRestSrv.getVentas().then(
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

      if (d.numFactura.toLowerCase().indexOf(val) !== -1 || !val) {
        returnData = d.numFactura.toLowerCase().indexOf(val) !== -1 || !val;
      } else if (d.cliente.toLowerCase().indexOf(val) !== -1 || !val) {
        returnData = d.cliente.toLowerCase().indexOf(val) !== -1 || !val;

      }
      return returnData;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
