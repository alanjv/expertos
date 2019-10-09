import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor() {
    console.log('servicio usuario listo');
  }

  crearUsuario( usuario: Usuario) {

  }
}
