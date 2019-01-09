import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  appitems = [
    {
      label: 'Inicio',//Texto a mostrar
      icon: 'menu', //Icono  https://material.io/tools/icons/?style=baseline
      link: '/admin/dashboard' // La ruta que va a mostrar
    },
    {
      label: 'Clientes',
      icon: 'person',
      items: [
        {
          label: 'Agregar',
          icon: 'person_add',
          link: '/admin/clientes/agregar'
        },
        {
          label: 'Listar',
          icon: 'format_list_numbered',
          link: '/admin/clientes/listar'
        },
        

      ]
    },
    {
      label: 'Productos',
      icon: 'card_giftcard',
      items: [
        {
          label: 'Agregar',
          icon: 'add_shopping_cart',
          link: '/admin/productos/agregar'
        },
        {
          label: 'Listar',
          icon: 'aformat_list_numbered',
          link: '/admin/productos/listar'
        }
      ]
    },
    {
      label: 'Ventas',
      icon: 'attach_money',
      items: [
        {
          label: 'Agregar',
          icon: 'add_shopping_cart',
          link: '/admin/ventas/agregar'
        },
        {
          label: 'Listar',
          icon: 'format_list_numbered',
          link: '/admin/ventas/listar'
        }
      ]
    },
    {
      label: 'Usuarios',
      icon: 'supervised_user_circle',
      items: [
        {
          label: 'Agregar',
          icon: 'add_shopping_cart',
          link: '/admin/usuarios/agregar'
        },
        {
          label: 'Listar',
          icon: 'format_list_numbered',
          link: '/admin/usuarios/listar'
        }
      ]
    },
    {
      label: 'Creditos',
      icon: 'credit_card',
      items: [
        {
          label: 'Agregar',
          icon: 'add_shopping_cart',
          link: '/admin/creditos/agregar'
        },
        {
          label: 'Listar',
          icon: 'assignment',
          link: '/admin/creditos/listar'
        }
      ]
      },
    {
      label: 'Reportes',
      icon: 'playlist_add_check',
      items: [
        {
          label: 'Agregar',
          icon: 'add_shopping_cart',
          link: '/admin/reportes/agregar'
        },
        {
          label: 'Listar',
          icon: 'playlist_add_check',
          link: '/admin/reportes/listar'
        }
      ]
    },
    
  ];

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
  ) {

  }

  ngOnInit() {
  }

  navegarMenu(evento) {
    switch (evento.link) {
      case "cerrarSesion":
        console.log("Cerrar Sesión");

        break;

      default:
        this.router.navigate([evento.link]);
        break;
    }
  }
}
