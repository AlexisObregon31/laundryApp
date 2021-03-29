import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit {

  email: string = "";
  password: string = "";

  constructor(
    private fireauth: AngularFireAuth,
    private navCtrl: NavController,
    public alertController: AlertController) { }

  ngOnInit() { }

  async avisoRegistro() {
    const alert = await this.alertController.create({
      cssClass: 'alert-registro',
      header: 'Registro',
      subHeader: "Usted se ha registrado correctamente",
      //message: 'Registro de Usuario exitoso !',
      buttons: ['Continuar']
    });
    await alert.present();
  }



  signup() {
    this.fireauth.createUserWithEmailAndPassword(this.email, this.password).then(res => {
      if (res.user) {
        console.log("Registro con éxito el User= " + res.user.uid);
        localStorage.setItem("Usuario:", res.user.uid);
        this.avisoRegistro();
        this.navCtrl.navigateForward('/lavanderias');
        //this.updateProfile();
      }
    })
      .catch(err => {
        console.log(`login failed ${err}`);
        //this.error = err.message;
      });
  }

}
