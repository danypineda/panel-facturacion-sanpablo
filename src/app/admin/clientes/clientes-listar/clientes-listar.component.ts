import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';

@Component({
  selector: 'app-clientes-listar',
  templateUrl: './clientes-listar.component.html',
  styleUrls: ['./clientes-listar.component.scss']
})
export class ClientesListarComponent implements OnInit {

  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  columns = [
    { prop: 'nombres', summaryFunc: () => null },
    { prop: 'apellidos', summaryFunc: () => null },
    { prop: 'identificacion', summaryFunc: () => null },
    { prop: 'email', summaryFunc: () => null },
    { prop: 'telefono', summaryFunc: () => null },
    { prop: 'direccion', summaryFunc: () => null },
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private readonly apiRestSrv: ApiRestService,
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.apiRestSrv.getClienteTodos().then(
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

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.identificacion.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
