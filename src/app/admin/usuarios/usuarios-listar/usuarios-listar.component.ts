import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.scss']
})
export class UsuariosListarComponent implements OnInit {
  public tmp:FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.tmp = this.formBuilder.group({
      "busqueda":[""]
    })
  }
}
