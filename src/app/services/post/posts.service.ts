import { Post } from './../../models/post';
import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  totalPosts = 0;

  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService
  ) { }

  cargarPosts() {
    const url = URL_SERVICIOS + '/posts';

    return this.http.get(url).pipe(map((resp: any) => {
        this.totalPosts = resp.total;
        console.log(resp.posts);
        return resp.posts;
    }));
  }

  obtenerPost(id: string) {
    const url = URL_SERVICIOS + '/posts/' + id;
    return this.http.get(url).pipe(map((resp: any) => {
      return resp.post;
  }));
  }

  buscarPosts(termino: string){
    let url = URL_SERVICIOS + '/busqueda/coleccion/posts/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.posts));

  }

  borrarPost(id: string) {
    let url = URL_SERVICIOS  + '/posts/' + id;
    url += '?token=' + this.usuarioService.token;

    return this.http.delete(url).pipe(map((resp: any) =>{
      Swal.fire(
        'Post borrado!',
        'Post borrado correctamente',
        'success'
      );
    }));
  }

  guardarPost(post: Post) {
    let url = URL_SERVICIOS  + '/posts/';

    if (post._id) {
      // actualizando
      url += '/' + post._id;
      url += '?token=' + this.usuarioService.token;
      return this.http.put(url, post).pipe(map((resp: any) => {
        Swal.fire(
          'Post Actualizado!',
          post.titulo,
          'success'
        );
        return resp.post;
      }));
    } else {
      // creando
      url += '?token=' + this.usuarioService.token;
      return this.http.post(url, post).pipe(map((resp: any) => {
        Swal.fire(
          'Post Creado!',
          post.titulo,
          'success'
        );
        return resp.post;
      }));
    }

  }
}
