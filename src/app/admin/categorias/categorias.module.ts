import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from './categorias.component';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasAgregarComponent } from './categorias-agregar/categorias-agregar.component';
import { CategoriasListarComponent } from './categorias-listar/categorias-listar.component';

@NgModule({
  imports: [
    CommonModule,
    CategoriasRoutingModule
  ],
  declarations: [CategoriasComponent,CategoriasAgregarComponent, CategoriasListarComponent]
})
export class CategoriasModule { }
