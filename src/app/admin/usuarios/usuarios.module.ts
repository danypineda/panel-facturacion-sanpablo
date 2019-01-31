import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosAgregarComponent } from './usuarios-agregar/usuarios-agregar.component';
import { UsuariosListarComponent } from './usuarios-listar/usuarios-listar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertModule } from 'ngx-alerts';

@NgModule({
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    ReactiveFormsModule,
    NgxDatatableModule
  ],
  declarations: [UsuariosComponent, UsuariosAgregarComponent, UsuariosListarComponent]
})
export class UsuariosModule { }
