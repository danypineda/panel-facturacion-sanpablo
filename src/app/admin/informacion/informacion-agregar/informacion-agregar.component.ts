import { Component, OnInit } from '@angular/core';
import { Configuracion } from '../../../core/models/configuracion.model';
import { AlertService } from 'ngx-alerts';
import { FormBuilder } from '@angular/forms';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';

@Component({
  selector: 'app-informacion-agregar',
  templateUrl: './informacion-agregar.component.html',
  styleUrls: ['./informacion-agregar.component.scss']
})
export class InformacionAgregarComponent implements OnInit {

  public configuracion = {} as Configuracion;

  constructor(
    private readonly apiRestSrv: ApiRestService,
    private readonly formBuilder: FormBuilder,
    private readonly alertService: AlertService,
  ) {
    this.cargarConfiguracion();
   }

  ngOnInit() {
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
}
