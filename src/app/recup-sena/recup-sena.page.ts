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
    if (this.email) {
      console.log(this.email);
      this.fireauth.sendPasswordResetEmail(this.email)
        .then(data => {
          console.log(data);
          //this.crearToast('Password reset email sent', 'bottom', 1000); // this is toastController
          this.avisoEnvioCorreo();
          this.router.navigateByUrl('/login');
        })

        .catch(err => {
          this.crearToast('Inserte un email válido !', 'bottom', 3000);
          console.log(` failed ${err}`);
          this.error = err.message;
        });
    } else {
      this.crearToast('Inserte un email válido !', 'bottom', 3000);
    }
  }

  async crearToast(message, position, duration) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'middle',
      buttons: [
        {
          side: 'start',
          icon: 'close-outline',
        }],
      color: 'warning',
      //translucent: true
    });
    toast.present();
  }

}
