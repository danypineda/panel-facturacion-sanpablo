import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { PanelPrincipalComponent } from './panel-principal/panel-principal.component';

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
			{ path: '', component: PanelPrincipalComponent }
		]
	}
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
