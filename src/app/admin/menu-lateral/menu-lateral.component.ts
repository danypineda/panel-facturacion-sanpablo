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
      label: 'Dashboard',
      icon: 'dashboard',
      link: '/admin/dashboard'
    },
    {
      label: 'Menu 1',
      icon: 'school',
      items: [
        {
          label: 'Agregar',
          link: '/admin/escuelas',
          icon: 'add_box'
        },
        {
          label: 'Listar',
          link: '/admin/listar-escuelas',
          icon: 'format_list_numbered'
        },
      ]
    },
    {
      label: 'Menu 2',
      icon: 'location_city',
      items: [
        {
          label: 'Agregar',
          link: '/admin/escuelas',
          icon: 'add_box'
        },
        {
          label: 'Listar',
          link: '/admin/listar-escuelas',
          icon: 'format_list_numbered'
        },
      ]
    },
    {
      label: 'Cerrar Sesión',
      icon: 'power_settings_new',
      link: 'cerrarSesion'
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
