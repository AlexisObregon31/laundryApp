import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';
import { FirebaseService } from './../services/firebase.service';
import { Usuario } from '../interfaces/usuario';
import { FormBuilder, FormGroup } from '@angular/forms';



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
    public alertController: AlertController,
    private firebaseService: FirebaseService) { }

  ngOnInit() { }

  headerAlert;

  async avisoLogin() {
    const alert = await this.alertController.create({
      cssClass: 'alert-login',
      header: this.headerAlert,
      subHeader: this.email,
      //message: 'Registro de Usuario exitoso !',
      buttons: ['Continuar']
    });
    await alert.present();
  }


login() {
  console.log("Logueando usuario...");
  this.fireauth.signInWithEmailAndPassword(this.email, this.password).then(res => {
    if (res.user) {
      localStorage.setItem("userUid", res.user.uid);
      localStorage.setItem("tipoUsuario", "cliente");
      localStorage.setItem("emailUser", this.email);
      console.log("Logueado exitosamente: " + this.email);
      this.consultarDatosUsuario("usuarios", "uid", "==", localStorage.getItem("userUid"));
      this.headerAlert = "Bienvenido !"
      this.avisoLogin();
      this.navCtrl.navigateForward('/lavanderias');
    }
  })
    .catch(err => {
      this.headerAlert = "El Usuario no Existe !"
      this.avisoLogin();
      console.log(`login failed ${err}`);
      //this.error = err.message;
    });
}

usuario: Usuario;
consultarDatosUsuario(coleccion, campo, condicion, valor) {
  this.firebaseService.consultar(coleccion, campo, condicion, valor).subscribe((resConsultaUser) => {
    this.usuario = {} as Usuario;
    resConsultaUser.forEach((datosUser: any) => {
      this.usuario.nombre = datosUser.payload.doc.data().nombre;
      localStorage.setItem("nombre", this.usuario.nombre);
    })
  });
}

}
