 import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-clientes-agregar',
  templateUrl: './clientes-agregar.component.html',
  styleUrls: ['./clientes-agregar.component.scss']
})
export class ClientesAgregarComponent implements OnInit {

  constructor(private formBuild: FormBuilder) { }

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
}