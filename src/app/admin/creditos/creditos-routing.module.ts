import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreditosComponent } from './creditos.component';
import { CreditosListarComponent } from './creditos-listar/creditos-listar.component';
import { CreditosAgregarComponent } from './creditos-agregar/creditos-agregar.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: 'listar',
		pathMatch: 'full'
  },
  {
    path: 'listar',
    component: CreditosComponent,
    children: [
      { path: '', component: CreditosListarComponent }
    ]
  },
  {
    path: 'agregar',
    component: CreditosComponent,
    children: [
      { path: '', component: CreditosAgregarComponent }
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
