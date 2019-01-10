import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas.component';
import { VentasRoutingModule } from './ventas-routing.module';
import { VentasAgregarComponent } from './ventas-agregar/ventas-agregar.component';
import { VentasListarComponent } from './ventas-listar/ventas-listar.component';

@NgModule({
  imports: [
    CommonModule,
    VentasRoutingModule,
  ],
  declarations: [VentasComponent, VentasAgregarComponent, VentasListarComponent],
})
export class VentasModule { }
