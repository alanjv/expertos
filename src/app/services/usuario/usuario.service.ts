
import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  constructor(public http: HttpClient,
              public router: Router,
              public subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

 logueado() {
  return (this.token.length > 5 ) ? true : false;
 }

 cargarStorage() {
  if ( localStorage.getItem('token')) {
  this.token = localStorage.getItem('token');
  this.usuario = JSON.parse(localStorage.getItem('usuario'));
  } else {
    this.token = '';
    this.usuario = null;
  }

 }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify( usuario));

    this.usuario = usuario;
    this.token = token;

  }

  logOut() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {

    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, {token})
    .pipe(map((resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
    }));
  }

  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
    localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
      return true;
  }));
  }


  crearUsuario( usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
    .pipe(map((resp: any) => {
      Swal.fire({
        title: 'Usuario creado',
        text: usuario.email,
        type: 'success',
        confirmButtonText: 'Ok'
      });
      return resp.usuario;
    }));
  }


  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(map( (resp: any ) => {
     if (usuario._id === this.usuario._id) {
      this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
     }
     Swal.fire(
        'Usuario actualizado',
        usuario.nombre,
        'success'
      );
     return true;
    }));
  }


  cambiarImagen(archivo: File, id: string) {
    this.subirArchivoService.subirArchivo(archivo, 'usuario', id)
    .then((resp: any) => {
      this.usuario.img = resp.usuario.img;
      Swal.fire(
        'Imagen actualizada',
        this.usuario.nombre,
        'success'
      );

      this.guardarStorage(id, this.token, this.usuario);

    }). catch(err => {
      console.error(err);
    });
  }



  cargarUsuarios(desde: number = 0) {
  let url = URL_SERVICIOS + '/usuario?desde=' + desde;

  return this.http.get(url);
  }



  buscarUsuario(termino: string) {
  let url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;
  return this.http.get(url).pipe(map((resp: any) => resp.usuarios));
  }



  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(map((resp: any) => {
      Swal.fire(
        'Eliminado!',
        'El usuario  ha sido eliminado correctamente',
        'success'
      );
      return true;
    }));
  }

  
}
