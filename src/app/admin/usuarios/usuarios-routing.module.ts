import { Routes, RouterModule } from '@angular/router';
import { UsuariosListarComponent } from './usuarios-listar/usuarios-listar.component';
import { UsuariosAgregarComponent } from './usuarios-agregar/usuarios-agregar.component';
import { UsuariosComponent } from './usuarios.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
		path: '',
		redirectTo: 'listar',
		pathMatch: 'full'
  },
  {
    path: 'listar',
    component: UsuariosComponent,
    children: [
      { path: '', component: UsuariosListarComponent }
    ]
  },
  {
    path: 'agregar',
    component: UsuariosComponent,
    children: [
      { path: '', component: UsuariosAgregarComponent }
    ]
  }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [RouterModule] 
})
export class UsuariosRoutingModule { }

