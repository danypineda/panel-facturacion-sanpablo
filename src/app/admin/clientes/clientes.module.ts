import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesListarComponent } from './clientes-listar/clientes-listar.component';
import { ClientesAgregarComponent } from './clientes-agregar/clientes-agregar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-alerts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../shared/shared.module';
import { MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ClientesRoutingModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    ReactiveFormsModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    SharedModule,
    MatDialogModule,
  ],
  declarations: [ClientesComponent, ClientesListarComponent]
})
export class ClientesModule { }
