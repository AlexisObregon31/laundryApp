import { ModelUsuarioService } from './../modelos/model_usuario';
import { Usuario } from './../interfaces/usuario';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lavanderia-prenda',
  templateUrl: './lavanderia-prenda.page.html',
  styleUrls: ['./lavanderia-prenda.page.scss'],
})
export class LavanderiaPrendaPage implements OnInit {

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
