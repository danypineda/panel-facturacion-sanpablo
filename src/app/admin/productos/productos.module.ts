import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ProductosAgregarComponent } from './productos-agregar/productos-agregar.component';
import { ProductosListarComponent } from './productos-listar/productos-listar.component';
import { ProductosRoutingModule } from './productos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-alerts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    CommonModule,
    ProductosRoutingModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    ReactiveFormsModule,
    NgxDatatableModule,
    Ng2SmartTableModule,
  ],
  declarations: [ProductosComponent, ProductosAgregarComponent, ProductosListarComponent]
})
export class ProductosModule { }
