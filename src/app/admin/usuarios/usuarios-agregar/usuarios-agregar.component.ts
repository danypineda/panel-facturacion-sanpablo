import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-usuarios-agregar',
  templateUrl: './usuarios-agregar.component.html',
  styleUrls: ['./usuarios-agregar.component.scss']
})
export class UsuariosAgregarComponent implements OnInit {

  // Paso 1
  public usuariosForm: FormGroup;
  constructor(private formBuild: FormBuilder) { }
  ngOnInit() {

    this.usuariosForm = this.formBuild.group({
      nombres: ["", Validators.compose([Validators.minLength(5), Validators.required])],
      apellidos: ["", Validators.compose([Validators.minLength(5), Validators.required])],
      cedula: ["", Validators.compose([Validators.maxLength(13), Validators.minLength(10), Validators.required])],
      email: ["", Validators.compose([Validators.email, Validators.required])],
      telefono: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(10), Validators.required])],
      direccion: ["", Validators.compose([Validators.minLength(5), Validators.required])],
      rol: ["", Validators.compose([Validators.minLength(5), Validators.required])],
      usuario: ["", Validators.compose([Validators.minLength(4), Validators.required])],
      contrasena: ["", Validators.compose([Validators.minLength(3), Validators.required])],
    });
  }

}
