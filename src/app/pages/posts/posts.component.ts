import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/service.index';
import { Post } from '../../models/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styles: []
})
export class PostsComponent implements OnInit {

  constructor(public postService: PostsService) { }

  posts: Post[] = [];

  ngOnInit() {
    this.cargarPosts();
  }

  buscarPost(termino: string) {
    if (termino.length <= 0 ) {
      this.cargarPosts();
    }

    this.postService.buscarPosts(termino)
  .subscribe(posts => this.posts = posts);

  }

  cargarPosts() {
    this.postService.cargarPosts()
    .subscribe(posts => this.posts = posts);
  }


  eliminarPost(post: Post) {
  this.postService.borrarPost(post._id)
  .subscribe(() => this.cargarPosts());
  }

}
