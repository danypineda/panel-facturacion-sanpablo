import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesListarComponent } from './clientes-listar/clientes-listar.component';
import { ClientesAgregarComponent } from './clientes-agregar/clientes-agregar.component';

@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule
  ],
  declarations: [ClientesComponent, ClientesListarComponent, ClientesAgregarComponent]
})
export class ClientesModule { }
