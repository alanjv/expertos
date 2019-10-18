import { Categoria } from './../../models/categoria';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: []
})
export class CategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  constructor(public categoriaService: CategoriaService) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.cargarCategorias()
    .subscribe(categorias => this.categorias = categorias );
  }

  buscarCategoria(termino: string) {
    if ( termino.length <= 0) {
        this.cargarCategorias();
        return;
    }
    this.categoriaService.buscarCategoria(termino).subscribe(categorias => this.categorias = categorias)

  }

  guardarCategoria(categoria: Categoria) {
    this.categoriaService.actualizarCategoria(categoria)
    .subscribe();
  }

  borarCategoria(categoria: Categoria) {
    this.categoriaService.borrarcategoria(categoria._id).subscribe(() => this.cargarCategorias());

  }

  crearCategoria() {
    Swal.fire({
      title: 'Crear categoria',
      input: 'text',
    }).then(valor => {
      if(!valor.value || valor.value.length === 0) {
        return;
      }
      this.categoriaService.crearCategoria(valor.value).subscribe(() => {
        this.cargarCategorias();
      });
    });

  }
}
