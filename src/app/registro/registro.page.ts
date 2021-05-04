import { UtilService } from './../services/util.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit, OnDestroy {

  email: string = "";
  password: string = "";
  ipAdress: string = "";
  suscripcion;

  constructor(
    private fireauth: AngularFireAuth,
    private navCtrl: NavController,
    public alertController: AlertController,
    private utilservice: UtilService) { }

  ngOnInit() {
    this.suscripcion = this.utilservice.getIpAdress().subscribe(text => {
      console.log("Obteniendo IP Adress");
      localStorage.setItem("ip", text);
      this.ipAdress = text;
    }
    );
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

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
        localStorage.setItem("userUid", res.user.uid);
        localStorage.setItem("tipoUsuario", "cliente");
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
