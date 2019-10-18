import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { CategoriaService } from '../../services/service.index';
import { Post } from './../../models/post';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../services/service.index';
import { Categoria } from '../../models/categoria';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styles: []
})
export class PostComponent implements OnInit {
  categorias: Categoria[] = [];
  post: Post = new Post('', '', '', '', '', '', '');

  comentarInput = document.querySelector('input[type="radio"][name="comentar"]:checked');

  constructor( public postService: PostsService,
               public categoriaService: CategoriaService,
               public router: Router,
               public activatedRoure: ActivatedRoute,
               public modalUploadService: ModalUploadService
               ) {
                 activatedRoure.params.subscribe(params => {
                   let id = params.id;

                   if (id !== 'nuevo') {
                    this.cargarPost(id);
                   }

                 });
               }

  ngOnInit() {
    this.categoriaService.cargarCategorias()
    .subscribe(categorias => this.categorias = categorias);

    this.modalUploadService.notificacion
    .subscribe(resp => {
      this.post.img = resp.post.img;

    });

  }

  tipoSeleccionedo(e: any) {
    this.post.tipo = e;
    console.log(this.post.tipo);
  }

  comentarSeleccionedo(e: any) {
    this.post.comentar = e;
    console.log(this.post.comentar);
  }

  cargarPost(id: string) {
    this.postService. obtenerPost(id)
    .subscribe(post => {this.post = post;

    });
  }

  guardarPost(f: NgForm) {
    this.post.tipo = 'public';

    if (f.invalid) {
      return;
    }
    this.postService.guardarPost(this.post)
    .subscribe( post => {
        console.log( post._id);
        this.post._id = post._id;
        this.router.navigate(['/post', post._id] );
    });

  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal('post', this.post._id);
  }

}
