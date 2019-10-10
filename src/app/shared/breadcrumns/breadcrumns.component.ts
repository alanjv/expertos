import { Router, ActivationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumns',
  templateUrl: './breadcrumns.component.html',
  styles: []
})
export class BreadcrumnsComponent implements OnInit {

  titulo: string;
  padre: string;

  constructor(private router: Router, private title: Title) {

    this.getDataRoute()
    .subscribe(data => {
      this.titulo = data.titulo;
      this.padre = data.padre;
      this.title.setTitle(this.titulo);
    });
   }

  ngOnInit() {
  }

  getDataRoute() {
   return  this.router.events.pipe(

      filter(e => e instanceof ActivationEnd),
      filter((e: ActivationEnd) => e.snapshot.firstChild === null ),
      map((e: ActivationEnd) => e.snapshot.data )

      );
  }
}
