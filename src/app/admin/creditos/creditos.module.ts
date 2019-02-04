import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditosComponent } from './creditos.component';
import { CreditosRoutingModule } from './creditos-routing.module';
import { CreditosAgregarComponent } from './creditos-agregar/creditos-agregar.component';
import { CreditosListarComponent } from './creditos-listar/creditos-listar.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-alerts';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule, 
    CreditosRoutingModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxDatatableModule,
  ],
  declarations: [CreditosComponent, CreditosAgregarComponent, CreditosListarComponent]
})
export class CreditosModule { }
