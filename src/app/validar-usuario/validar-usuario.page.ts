import { NavController, AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validar-usuario',
  templateUrl: './validar-usuario.page.html',
  styleUrls: ['./validar-usuario.page.scss'],
})
export class ValidarUsuarioPage implements OnInit {

  constructor(private fireauth: AngularFireAuth,
    private navCtrl: NavController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async alert() {
    const alert = await this.alertController.create({
      cssClass: 'alert',
      header: 'Listo',
      subHeader: "Se ha enviado un correo de verificación a su email",
      //message: 'Registro de Usuario exitoso !',
      buttons: ['OK']
    });
    await alert.present();
  }

  reenviarCorreo() {
    this.fireauth.currentUser.then(user => user.sendEmailVerification());
    console.log("Correo enviado !")
    this.alert();
    this.navCtrl.navigateForward('/lavanderias');
  }

}
