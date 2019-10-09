import { Usuario } from './../models/usuario.model';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from './../services/service.index';
import { Router } from '@angular/router';


declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {


  forma: FormGroup;
  constructor(public usuarioService: UsuarioService,
              public router: Router
    ) { }

  iguales(group: FormGroup) {
    return group.get('password').value === group.get('password2').value
       ? null : {passwordNoIguales: true};
 }

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, {validators: this.iguales });

  }

  registrarUsuario() {

    if ( this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {

      Swal.fire({
        title: 'Importante!',
        text: 'Debe aceptar los terminos',
        type: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this.usuarioService.crearUsuario(usuario)
   .subscribe(res => {
     this.router.navigate(['login']);
   });

  }

}
