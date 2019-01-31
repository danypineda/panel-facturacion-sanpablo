import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-clientes-agregar',
  templateUrl: './clientes-agregar.component.html',
  styleUrls: ['./clientes-agregar.component.scss']
})
export class ClientesAgregarComponent implements OnInit {

  constructor(
    private formBuild: FormBuilder,
    private readonly apiRestSrv: ApiRestService,
    private readonly alertService: AlertService,
  ) { }

  // Paso 1
  public clientesForm: FormGroup;

  ngOnInit() {

    // paso2
    this.clientesForm = this.formBuild.group({
      nombres: ["", Validators.compose([Validators.minLength(5), Validators.required])],
      apellidos: ["", Validators.compose([Validators.minLength(5), Validators.required])],
      identificacion: ["", Validators.compose([Validators.maxLength(13), Validators.minLength(10), Validators.required])],
      email: ["", Validators.compose([Validators.email, Validators.required])],
      telefono: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(10), Validators.required])],
      direccion: ["", Validators.compose([Validators.minLength(5), Validators.required])],
    });
  }

  public agregarCliente(data): void {
    this.apiRestSrv.addCliente(data).then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.Alerta("success", "Cliente creado");
            this.clientesForm.reset();
            break;
          case 'duplicado':
            this.Alerta("error", "Ya existe una cuenta creada con esta información.");
            break;
          case 'fail':
            this.Alerta("error", "Oops, tuvimos un problema al crear el registro, inténtalo nuevamente.");
            break;
        }
      }, (err) => {
        this.Alerta("error", "Oops, tuvimos un problema al crear el registro, inténtalo nuevamente.");
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