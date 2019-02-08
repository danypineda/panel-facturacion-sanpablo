import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasComponent } from './categorias.component';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasAgregarComponent } from './categorias-agregar/categorias-agregar.component';
import { CategoriasListarComponent } from './categorias-listar/categorias-listar.component';
import { AlertModule } from 'ngx-alerts';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    ReactiveFormsModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
    SharedModule,
  ],
  declarations: [CategoriasComponent, CategoriasListarComponent],
  entryComponents: [
    CategoriasAgregarComponent
  ]
})
export class CategoriasModule { }
