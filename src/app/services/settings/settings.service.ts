import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/defecto.css',
    tema: 'defecto'
  };

  constructor(@Inject(DOCUMENT) private _document,) {
    this.cargarAustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {
      this.aplicarTema(this.ajustes.tema);
    }
  }


aplicarTema(color: string){
  const url = `assets/css/colors/${color}.css`;
  this._document.getElementById('tema').href = url;

  this.ajustes.tema = color;
  this.ajustes.temaUrl = url;

  this.guardarAjustes();
}

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}