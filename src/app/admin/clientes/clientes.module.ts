import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesListarComponent } from './clientes-listar/clientes-listar.component';
import { ClientesAgregarComponent } from './clientes-agregar/clientes-agregar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClientesComponent, ClientesListarComponent, ClientesAgregarComponent]
})
export class ClientesModule { }
