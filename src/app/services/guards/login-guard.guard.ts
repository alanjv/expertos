import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';


@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor( public usuarioService: UsuarioService,
               public router: Router) {

  }

  canActivate() {
    if (this.usuarioService.logueado()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }
}
