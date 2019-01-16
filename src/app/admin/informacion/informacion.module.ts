import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacionComponent } from './informacion.component';
import { InformacionRoutingModule } from './informacion-routing.module';
import { InformacionAgregarComponent } from './informacion-agregar/informacion-agregar.component';
@NgModule({
  imports: [
    CommonModule,
    InformacionRoutingModule
  ],
  declarations: [InformacionComponent, InformacionAgregarComponent]
})
export class InformacionModule { }
