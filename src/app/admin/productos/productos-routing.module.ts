import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductosComponent } from './productos.component';
import { ProductosListarComponent } from './productos-listar/productos-listar.component';
import { ProductosAgregarComponent } from './productos-agregar/productos-agregar.component';
const routes: Routes = [
  {
		path: '',
		redirectTo: 'listar',
		pathMatch: 'full'
  },
  {
    path: 'listar',
    component: ProductosComponent,
    children: [
      { path: '', component: ProductosListarComponent }
    ]
  },
  {
    path: 'agregar',
    component:ProductosComponent,
    children: [
      { path: '', component: ProductosAgregarComponent }
    ]
  }
];      

@NgModule({
	imports: [
		RouterModule.forChild(routes),
	],
	exports: [RouterModule]
})
export class ProductosRoutingModule { }