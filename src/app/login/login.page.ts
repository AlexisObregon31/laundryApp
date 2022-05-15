import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';
import { FirebaseService } from './../services/firebase.service';
import { Usuario } from '../interfaces/usuario';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {


  email: string = "";
  password: string = "";
  usuario: Usuario;

  constructor(
    private fireauth: AngularFireAuth,
    private navCtrl: NavController,
    public alertController: AlertController,
    private firebaseService: FirebaseService) { }

  ngOnInit() { }

  headerAlert;
  subHeader;

  async avisoLogin() {
    const alert = await this.alertController.create({
      cssClass: 'ion-alert',
      header: this.headerAlert,
      subHeader: this.subHeader,
      //message: 'Registro de Usuario exitoso !',
      buttons: ['OK']
    });
    await alert.present();
  }


  login() {
    console.log("Logueando usuario...");
    this.fireauth.signInWithEmailAndPassword(this.email, this.password).then(res => {
      if (res.user) {
        this.consultarDatosUsuario("usuarios", "uid", "==", res.user.uid);
        localStorage.setItem("userUid", res.user.uid);
        localStorage.setItem("nombre", this.usuario.nombre);
        localStorage.setItem("tipoUsuario", this.usuario.tipo);
        localStorage.setItem("emailUser", this.email);
        console.log("Logueado exitosamente: " + this.usuario.nombre);
        //this.consultarDatosUsuario("usuarios", "uid", "==", localStorage.getItem("userUid"));
        this.headerAlert = "Bienvenido";
        this.subHeader = this.usuario.nombre;
        this.avisoLogin();
        if (res.user.emailVerified)
          this.navCtrl.navigateForward('/lavanderias');
        else
          this.navCtrl.navigateForward('/validar-usuario');
      } else {
        this.headerAlert = "Error al ingresar!";
        this.subHeader = "Favor registrarse e intente nuevamente...";
        this.avisoLogin();
      }
    })
      .catch(err => {
        this.headerAlert = "Correo o seña inválida"
        this.subHeader = "Los datos son incorrectos o no existe la cuenta"
        this.avisoLogin();
        console.log(`login failed ${err}`);
        //this.error = err.message;
      });
  }


  consultarDatosUsuario(coleccion, campo, condicion, valor) {
    this.firebaseService.consultar(coleccion, campo, condicion, valor).subscribe((resConsultaUser) => {
      this.usuario = {} as Usuario;
      resConsultaUser.forEach((datosUser: any) => {
        //this.usuario.nombre = datosUser.payload.doc.data().nombre;
        //localStorage.setItem("nombre", this.usuario.nombre);
        this.usuario = datosUser.payload.doc.data();
      })
    });
  }

}
