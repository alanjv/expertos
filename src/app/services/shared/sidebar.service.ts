import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [{
    titulo: 'principal',
    icono:  'mdi mdi-gauge',
    submenu: [
      {titulo: 'admin', url: '/principal'},
      {titulo: 'usuarios', url: '/users'}
    ]
  }, {
    titulo: 'Archivos',
    icono:  'mdi mdi-archive',
    submenu: [
      {titulo: 'Imagenes', url: '/images'},
      {titulo: 'Videos', url: '/videos'},
      {titulo: 'Archivos', url: '/archives'}
    ]
  }, {
    titulo: 'Paginas',
    icono:  'mdi mdi-book-multiple-variant',
    submenu: [
      {titulo: 'Crear', url: '/create-page'},
      {titulo: 'Posts', url: '/posts'},
      {titulo: 'Comentarios', url: '/coments'}
    ]
  }, {
    titulo: 'Temas',
    icono:  'mdi mdi-palette',
    submenu: [
      {titulo: 'Plantillas', url: '/templates'},
      {titulo: 'Temas', url: '/account-settings'}
    ]
  }

  ];


  constructor() { }
}
