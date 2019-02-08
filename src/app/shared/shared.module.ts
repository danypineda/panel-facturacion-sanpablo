import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequiredLabelDirective } from './directives/required-label.directive';
import { ClientesAgregarComponent } from '../admin/clientes/clientes-agregar/clientes-agregar.component';
import { AlertModule } from 'ngx-alerts';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CategoriasAgregarComponent } from '../admin/categorias/categorias-agregar/categorias-agregar.component';

@NgModule({
    imports: [
        CommonModule,
        AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
        ReactiveFormsModule,
        NgxDatatableModule,
        Ng2SmartTableModule,
    ],
    declarations: [RequiredLabelDirective, ClientesAgregarComponent, CategoriasAgregarComponent],
    exports: [
        RequiredLabelDirective, ClientesAgregarComponent, CategoriasAgregarComponent
    ]
})
export class SharedModule { }
