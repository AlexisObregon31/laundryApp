import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';
//import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {


  email: string = "";
  password: string = "";

  constructor(
    private fireauth: AngularFireAuth,
    private navCtrl: NavController,
    public alertController: AlertController) { }

  ngOnInit() { }

  async avisoLogin() {
    const alert = await this.alertController.create({
      cssClass: 'alert-login',
      header: 'Bienvenido',
      subHeader: this.email,
      //message: 'Registro de Usuario exitoso !',
      buttons: ['Continuar']
    });
    await alert.present();
  }

  login() {
    this.fireauth.signInWithEmailAndPassword(this.email, this.password).then(res => {
      if (res.user) {
        localStorage.setItem("Usuario:", res.user.uid);
        console.log("Usuario logueado = " + res.user.uid);
        this.avisoLogin();
        this.navCtrl.navigateForward('/lavanderias');

      }
    })
      .catch(err => {
        console.log(`login failed ${err}`);
        //this.error = err.message;
      });
  }

}
