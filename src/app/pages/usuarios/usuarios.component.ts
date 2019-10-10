import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde = 0;
  totalRegistros = 0;
 cargando = true;

  constructor(public usuarioService: UsuarioService,
              public modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUploadService.notificacion
          .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {

    this.modalUploadService.mostrarModal( 'usuario', id );
  }


  cargarUsuarios() {
    this.cargando = true;

    this.usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });

  }

  cambiarDesde(valor: number) {
  const desde = this.desde + valor;

  if (desde >= this.totalRegistros) {
    return;
    }

  if (desde < 0) {
      return;
    }
  this.desde += valor;
  this.cargarUsuarios();
  }

  buscarUsuario( termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.usuarioService.buscarUsuario(termino).subscribe((usuarios: Usuario[]) => {
    this.usuarios = usuarios;
    this.cargando = false;
  });
  }

  borarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuarioService.usuario._id) {
      Swal.fire(
        'No se puede borarr usuario!',
        'No se puede borrar a usted mismo',
        'error'
      );
      return;
    }


    Swal.fire({
  title: 'Está seguro?',
  text: 'Está a punto de borrar a' + usuario.nombre,
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: 'success',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Si, Eliminar!'
}).then((result) => {
  if (result.value) {

    this.usuarioService.borrarUsuario(usuario._id)
    .subscribe(resp => {
    this.cargarUsuarios();
    });
  }
});
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }

}
