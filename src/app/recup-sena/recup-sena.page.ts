import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recup-sena',
  templateUrl: './recup-sena.page.html',
  styleUrls: ['./recup-sena.page.scss'],
})
export class RecupSenaPage implements OnInit {

  email = '';
  password = '';
  error = '';
  username = '';
  image: number;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) { }

  ngOnInit() { }

  async avisoEnvioCorreo() {
    const alert = await this.alertController.create({
      cssClass: 'alert-recupsena',
      header: 'Envio exitoso !',
      subHeader: "",
      message: "Se ha enviado un correo a " + this.email,
      buttons: ['Continuar']
    });
    await alert.present();
  }

  async openLoader() {
    const loading = await this.loadingController.create({
      message: 'Please Wait ...',
      duration: 2000
    });
    await loading.present();
  }
  async closeLoading() {
    return await this.loadingController.dismiss();
  }

  recover() {
    this.fireauth.sendPasswordResetEmail(this.email)
      .then(data => {
        console.log(data);
        this.presentToast('Password reset email sent', 'bottom', 1000); // this is toastController
        this.avisoEnvioCorreo();
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  async presentToast(message, position, duration) {
    const toast = await this.toastController.create({
      message,
      duration,
      position
    });
    toast.present();
  }

}
