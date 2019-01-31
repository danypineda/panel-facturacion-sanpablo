import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiRestService } from '../../../core/services/api-rest.service';
import { RespuestaApi } from '../../../core/models/respuesta-api.model';
@Component({
  selector: 'app-usuarios-agregar',
  templateUrl: './usuarios-agregar.component.html',
  styleUrls: ['./usuarios-agregar.component.scss']
})
export class UsuariosAgregarComponent implements OnInit {
  

  // Paso 1
  public usuariosForm: FormGroup;
  constructor(
    private formBuild: FormBuilder,
    private readonly apiRestSrv: ApiRestService,
  ) { }
  ngOnInit() {

    this.usuariosForm = this.formBuild.group({
      nombres: ["", Validators.compose([Validators.minLength(5), Validators.required])],
      apellidos: ["", Validators.compose([Validators.minLength(5), Validators.required])],
      cedula: ["", Validators.compose([Validators.maxLength(13), Validators.minLength(10), Validators.required])],
      email: ["", Validators.compose([Validators.email, Validators.required])],
      telefono: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(10), Validators.required])],
      rol: ["", Validators.required],
      usuario: ["", Validators.compose([Validators.minLength(4), Validators.required])],
      password: ["", Validators.compose([Validators.minLength(3), Validators.required])],
    });
  }

  public agregarUsuario(datosUsuario: any): void {
    this.apiRestSrv.addUsuario(datosUsuario).then(
      (res: RespuestaApi) => {
        switch (res.status) {
          case "ok":
            console.log("Usuario registrado", res.response);
            this.usuariosForm.reset();

            break;
          case "fail":
            console.error("Error al registrar", res.response);

            break;
        }
      }, (err) => {
        console.error("Add usuario", err);

      }
    );


  }

}
