import { Routes, RouterModule } from '@angular/router';
import { InformacionComponent } from './informacion.component';
import { InformacionAgregarComponent } from './informacion-agregar/informacion-agregar.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
		path: '',
		redirectTo: 'listar',
		pathMatch: 'full'
  },
  {
    path: 'agregar',
    component: InformacionComponent,
    children: [
      { path: '', component: InformacionAgregarComponent }
    ]
  }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [RouterModule]
})
export class InformacionRoutingModule { }
