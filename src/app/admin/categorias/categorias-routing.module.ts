import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoriasComponent } from './categorias.component';
import { CategoriasAgregarComponent } from './categorias-agregar/categorias-agregar.component';
import { CategoriasListarComponent } from './categorias-listar/categorias-listar.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: 'listar',
		pathMatch: 'full'
  },
  {
    path: 'listar',
    component: CategoriasComponent,
    children: [
      { path: '', component: CategoriasListarComponent }
    ]
  },
  {
    path: 'agregar',
    component: CategoriasComponent,
    children: [
      { path: '', component: CategoriasAgregarComponent }
    ]
  }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [RouterModule]
})
export class CategoriasRoutingModule { }
