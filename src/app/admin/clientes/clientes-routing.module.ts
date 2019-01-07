import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { ClientesListarComponent } from './clientes-listar/clientes-listar.component';
import { ClientesAgregarComponent } from './clientes-agregar/clientes-agregar.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
		path: '',
		redirectTo: 'listar',
		pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ClientesComponent,
    children: [
      { path: '', component: ClientesListarComponent }
    ]
  },
  {
    path: 'agregar',
    component: ClientesComponent,
    children: [
      { path: '', component: ClientesAgregarComponent }
    ]
  }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [RouterModule]
})
export class ClientesRoutingModule { }
