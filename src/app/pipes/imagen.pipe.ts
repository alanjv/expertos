import { URL_SERVICIOS } from './../config/config';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if (!img) {
      return url + '/usuario/xxx';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch (tipo) {
    case 'usuario':
      url += '/usuario/' + img;
      break;

    case 'post':
      url += '/post/' + img;
      break;


    default:
     console.log('El tipo de imagen no existe');
    }
    return url;
  }

}
