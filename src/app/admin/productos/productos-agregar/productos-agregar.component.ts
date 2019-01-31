import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';

@Component({
  selector: 'app-productos-agregar',
  templateUrl: './productos-agregar.component.html',
  styleUrls: ['./productos-agregar.component.scss']
})
export class ProductosAgregarComponent implements OnInit {

  // Paso 1
  public productosForm: FormGroup;

  constructor(
    private formBuild: FormBuilder,
    private readonly apiRestSrv: ApiRestService,
    private readonly alertService: AlertService,
  ) { }
  ngOnInit() {

    // paso2
    this.productosForm = this.formBuild.group({
      codigo: ["", Validators.required],
      categoria: ["", Validators.compose([Validators.minLength(2), Validators.required])],
      nombre: ["", Validators.compose([Validators.minLength(5), Validators.required])],
      detalle: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(100), Validators.required])],
      precio: ["", Validators.compose([Validators.required])],
      stock: ["", Validators.compose([Validators.required])],
    });
  }

  public crearProducto(data: any): void {
    this.apiRestSrv.addProducto(data).then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case 'ok':
            this.Alerta("success", "Producto registrado");
            this.productosForm.reset();
            break;
          case 'duplicado':
            this.Alerta("error", "Ya existe un producto con esta información.");
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