import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VentasListarComponent } from './ventas-listar/ventas-listar.component';
import { VentasAgregarComponent } from './ventas-agregar/ventas-agregar.component';
import { VentasComponent } from './ventas.component';
const routes: Routes = [
  {
		path: '',
		redirectTo: 'listar',
		pathMatch: 'full'
  },
  {
    path: 'listar',
    component: VentasComponent,
    children: [
      { path: '', component: VentasListarComponent }
    ]
  },
  {
    path: 'agregar',
    component: VentasComponent,
    children: [
      { path: '', component: VentasAgregarComponent }
    ]
  }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [RouterModule]
})
export class VentasRoutingModule { }