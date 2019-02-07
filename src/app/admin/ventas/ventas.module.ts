import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas.component';
import { VentasRoutingModule } from './ventas-routing.module';
import { VentasAgregarComponent } from './ventas-agregar/ventas-agregar.component';
import { VentasListarComponent } from './ventas-listar/ventas-listar.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-alerts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatDialogModule} from '@angular/material/dialog';
import { ClientesAgregarComponent } from '../clientes/clientes-agregar/clientes-agregar.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    NgMultiSelectDropDownModule.forRoot(),
    NgxDatatableModule,
    MatDialogModule,
    SharedModule,
  ],
  declarations: [VentasComponent, VentasAgregarComponent, VentasListarComponent],
  entryComponents: [ClientesAgregarComponent]
})
export class VentasModule { }
