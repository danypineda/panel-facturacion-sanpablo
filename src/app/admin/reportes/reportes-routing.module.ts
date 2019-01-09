import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReportesComponent } from './reportes.component';
import { ReportesAgregarComponent } from './reportes-agregar/reportes-agregar.component';
import { ReportesListarComponent } from './reportes-listar/reportes-listar.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: 'listar',
		pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ReportesComponent,
    children: [
      { path: '', component: ReportesListarComponent }
    ]
  },
  {
    path: 'agregar',
    component:      ReportesComponent,
    children: [
      { path: '', component: ReportesAgregarComponent }
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
