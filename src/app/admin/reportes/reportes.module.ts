import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesComponent } from './reportes.component';
import { ReportesAgregarComponent } from './reportes-agregar/reportes-agregar.component';
import { ReportesListarComponent } from './reportes-listar/reportes-listar.component';
import { ReportesRoutingModule } from './reportes-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReportesRoutingModule 
  ],
  declarations: [ReportesComponent, ReportesAgregarComponent, ReportesListarComponent],
})
export class ReportesModule { }
