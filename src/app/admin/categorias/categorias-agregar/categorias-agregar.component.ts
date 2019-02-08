import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { AlertService } from 'ngx-alerts';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';

@Component({
  selector: 'app-categorias-agregar',
  templateUrl: './categorias-agregar.component.html',
  styleUrls: ['./categorias-agregar.component.scss']
})
export class CategoriasAgregarComponent implements OnInit {


  // Paso 1
  public categoriasForm: FormGroup;
  constructor(
    private formBuild: FormBuilder,
    private readonly apiRestSrv: ApiRestService,
    private readonly alertService: AlertService,
  ) { }
  ngOnInit() {

    this.categoriasForm = this.formBuild.group({
      nombre: ["", Validators.compose([Validators.minLength(5), Validators.required])],
      descripcion: ["", Validators.compose([Validators.minLength(5), Validators.required])],
    });
  }

  public agregarCategoria(datosCategoria: any): void {
    this.apiRestSrv.addCategoria(datosCategoria).then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.Alerta("success", "Categoria creado");
            this.categoriasForm.reset();
            break;
          case 'duplicado':
            this.Alerta("error", "Ya existe una cuenta creada con esta información.");
            break;
          case 'fail':
            this.Alerta("error", "Oops, tuvimos un problema al crear el registro, inténtalo nuevamente.");
            break;
        }
      }, (err) => {
        console.error("Add categoria", err);
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
