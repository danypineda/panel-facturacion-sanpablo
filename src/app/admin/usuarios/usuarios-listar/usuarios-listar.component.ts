import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.scss']
})
export class UsuariosListarComponent implements OnInit {
  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  columns = [
    { prop: 'cedula', summaryFunc: () => null },
    { prop: 'nombres', summaryFunc: () => null },
    { prop: 'apellidos', summaryFunc: () => null },
    { prop: 'email', summaryFunc: () => null },
    { prop: 'telefono', summaryFunc: () => null },
    { prop: 'usuario', summaryFunc: () => null },
    { prop: 'rol', canAutoResize: true, summaryFunc: () => null }
  ];
  public tmp: FormGroup;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private formBuilder: FormBuilder,
    private readonly apiRestSrv: ApiRestService,
  ) { }

  ngOnInit() {
    this.tmp = this.formBuilder.group({
      "busqueda": [""]
    });

    this.cargarDatos();
  }

  private cargarDatos(): void {
    this.apiRestSrv.getUsuarioTodos().then(
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
      return d.cedula.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
