import { ModelUsuarioService } from './../modelos/model_usuario';
import { Usuario } from './../interfaces/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicio-prenda',
  templateUrl: './servicio-prenda.page.html',
  styleUrls: ['./servicio-prenda.page.scss'],
})
export class ServicioPrendaPage implements OnInit {

  constructor(private model_usuario: ModelUsuarioService) {
    this.traerDatosUsuario();
  }

  ngOnInit() {
  }

  usuario: Usuario;

  traerDatosUsuario() {
    this.usuario as Usuario;
    this.usuario = this.model_usuario.getUsuario();
  }
}
