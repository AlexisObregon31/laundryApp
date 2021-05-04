import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lavanderias',
  templateUrl: './lavanderias.page.html',
  styleUrls: ['./lavanderias.page.scss'],
})
export class LavanderiasPage implements OnInit {

  constructor() {
    this.btnUsuario();
  }

  ngOnInit() {
  }
  emailUser;
  usuarioLogueado;
  loginOrPerfil;

  btnUsuario() {
    this.emailUser = localStorage.getItem("emailUser");
    console.log('Esta logueado el usuario? -->  ' + this.emailUser);
    if (this.emailUser != null) {
      this.loginOrPerfil = '/editar-perfil';
    } else {
      this.loginOrPerfil = '/login';
    }
    }
}
