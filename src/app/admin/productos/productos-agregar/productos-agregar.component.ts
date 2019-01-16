import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-productos-agregar',
  templateUrl: './productos-agregar.component.html',
  styleUrls: ['./productos-agregar.component.scss']
})
export class ProductosAgregarComponent implements OnInit {

  // Paso 1
  public productosForm: FormGroup;

  constructor(private formBuild: FormBuilder) { }
  ngOnInit() {

    // paso2
    this.productosForm = this.formBuild.group({
      codigo: ["", Validators.required],
      categoria: ["", Validators.compose([Validators.minLength(2), Validators.required])],
      nombre: ["", Validators.compose([Validators.minLength(5), Validators.required])],
      detalle: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(100), Validators.required])],
      precio: ["", Validators.compose([ Validators.required])],
      stock: ["", Validators.compose([ Validators.required])],
    });
  }
}