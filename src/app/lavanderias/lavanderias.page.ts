import { LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lavanderias',
  templateUrl: './lavanderias.page.html',
  styleUrls: ['./lavanderias.page.scss'],
})
export class LavanderiasPage implements OnInit {

  constructor(private loading: LoadingController,
    private navCtrl: NavController) {
    //this.btnUsuario();
  }

  ngOnInit() {
  }
  emailUser;
  usuarioLogueado;

  async btnUsuario() {
    this.emailUser = localStorage.getItem("emailUser");
    console.log('Esta logueado el usuario? -->  ' + this.emailUser);

    const load = await this.loading.create({
      spinner: 'dots',
    });
    load.present();

    if (this.emailUser != null) {
      this.navCtrl.navigateForward('/editar-perfil');
    } else {
      this.navCtrl.navigateForward('/login');
    }
    load.dismiss();
  }
}
