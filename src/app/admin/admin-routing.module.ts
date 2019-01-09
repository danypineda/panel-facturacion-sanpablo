import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: AdminComponent,
		children: [
			{ path: '', component: DashboardComponent }
		]
	},
	{
		path: 'clientes',
		component: AdminComponent,
		loadChildren: './clientes/clientes.module#ClientesModule'
	},
	{
		path: 'productos',
		component: AdminComponent,
		loadChildren: './productos/productos.module#ProductosModule'
	},
	{
		path: 'ventas',
		component: AdminComponent,
		loadChildren: './ventas/ventas.module#VentasModule'
	},
	{
		path: 'usuarios',
		component: AdminComponent,
		loadChildren: './usuarios/usuarios.module#UsuariosModule'
	},
	{
		path: 'creditos',
		component: AdminComponent,
		loadChildren: './creditos/creditos.module#UsuariosModule'
	},
	{
		path: 'creditos',
		component: AdminComponent,
		loadChildren: './reportes/reportes.module#ReportesModule'
	},
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		MatButtonModule,
		MatCheckboxModule
	],
	exports: [RouterModule]
})
export class AdminRoutingModule { }
