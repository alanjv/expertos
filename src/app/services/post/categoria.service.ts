import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Categoria } from '../../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  totalCategorias = 0;

  constructor(
    public http: HttpClient,
    public usuarioService: UsuarioService
  ) { }

  cargarCategorias() {
    const url = URL_SERVICIOS + '/categorias';

    return this.http.get(url).pipe(map((resp: any) => {
        this.totalCategorias = resp.total;
        return resp.categorias;
    }));
  }

  obtenerPostsCategoria(id: string) {
    const url = URL_SERVICIOS + '/categorias/' + id;
    return this.http.get(url).pipe(map((resp: any) =>  resp.categoria ));
  }

  borrarcategoria(id: string) {
    let url = URL_SERVICIOS + '/categorias/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url).pipe(map((resp: any) => {
      Swal.fire(
        'Categoria Borrada!',
        'Eliminada correctamente!',
        'success'
      );
  }));
  }

  crearCategoria(nombreCategoria: string) {
    let url = URL_SERVICIOS + '/categorias' ;
    url += '?token=' + this.usuarioService.token;
    let id = this.usuarioService.usuario._id;

    return  this.http.post(url, {nombreCategoria,
                                usuario: id})
    .pipe(map((resp: any) =>  resp.categoria ));
  }

  buscarCategoria(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/categorias/' + termino;
    return this.http.get(url).pipe(map((resp: any) => resp.categorias));

  }

  actualizarCategoria(categoria: Categoria) {
    let url = URL_SERVICIOS + '/categorias/' + categoria._id;
    url += '?token=' + this.usuarioService.token;
    return this.http.put(url, categoria).pipe(map((resp: any) => {
      Swal.fire(
        'Categoria Actualizada!',
        categoria.nombreCategoria,
        'success'
      );
      return resp.categoria;
    }));
  }

  
}
