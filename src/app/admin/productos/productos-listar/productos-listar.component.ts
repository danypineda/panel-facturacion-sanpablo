import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-productos-listar',
  templateUrl: './productos-listar.component.html',
  styleUrls: ['./productos-listar.component.scss']
})
export class ProductosListarComponent implements OnInit {
public tmp:FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.tmp = this.formBuilder.group({
      "busqueda":[""]
    })
  }

}
