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

@NgModule({
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    NgMultiSelectDropDownModule.forRoot(),
    NgxDatatableModule,
  ],
  declarations: [VentasComponent, VentasAgregarComponent, VentasListarComponent],
})
export class VentasModule { }
