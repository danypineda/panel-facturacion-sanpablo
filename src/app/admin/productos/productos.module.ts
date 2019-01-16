import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ProductosAgregarComponent } from './productos-agregar/productos-agregar.component';
import { ProductosListarComponent } from './productos-listar/productos-listar.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ProductosComponent, ProductosAgregarComponent, ProductosListarComponent]
})
export class ProductosModule { }
