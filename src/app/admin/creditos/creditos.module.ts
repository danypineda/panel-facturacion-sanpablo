import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditosComponent } from './creditos.component';
import { CreditosRoutingModule } from './creditos-routing.module';
import { CreditosAgregarComponent } from './creditos-agregar/creditos-agregar.component';
import { CreditosListarComponent } from './creditos-listar/creditos-listar.component';

@NgModule({
  imports: [
    CommonModule, 
    CreditosRoutingModule
  ],
  declarations: [CreditosComponent, CreditosAgregarComponent, CreditosListarComponent]
})
export class CreditosModule { }
