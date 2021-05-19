import { Usuario } from './../interfaces/usuario';
import { FirebaseService } from './../services/firebase.service';
import { UtilService } from './../services/util.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit, OnDestroy {

  //email: string = "";
  //password: string = "";
  ipAdress: string = "";
  suscripcion;
  idUser: string;
  controlClave: string;
  load;

  constructor(
    private fireauth: AngularFireAuth,
    private navCtrl: NavController,
    public alertController: AlertController,
    private utilservice: UtilService,
    private loading: LoadingController,
    private firebaseService: FirebaseService,
    private toastCont: ToastController) {
    this.usuario = {} as Usuario;
  }

  ngOnInit() {
    this.suscripcion = this.utilservice.getIpAdress().subscribe(text => {
      console.log("Obteniendo IP Adress");
      localStorage.setItem("ip", text);
      this.ipAdress = text;
    })

    this.load = this.loading.create({
      spinner: 'dots'
    });
  }

  usuario: Usuario;

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  async avisoRegistro(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert-registro',
      header: mensaje,
      subHeader: "Para continuar, verifique el correo enviado para validar su cuenta !",
      //message: 'Registro de Usuario exitoso !',
      buttons: ['OK']
    });
    await alert.present();
  }

  async crearToast(mensage: string) {
    const toast = await this.toastCont.create({
      //header: mensage,
      color: 'dark',
      duration: 2000,
      //message: 'Click to Close',
      //position: 'middle',
      buttons: [
        {
          side: 'start',
          icon: 'checkmark-outline',
          text: ' ' + mensage,
          handler: () => {
            console.log('Favorite clicked');
          }
        }/*, {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }*/
      ]
    });
    await toast.present();
    await toast.onDidDismiss();
  }



  async signup() {
    if (this.usuario.clave == this.controlClave) {
      await this.load.present();
      //this.usuario = {} as Usuario;
      this.fireauth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.clave).then(res => {
        if (res.user) {
          this.usuario.uid = res.user.uid;
          console.log("Registro con éxito el User = " + res.user.uid);
          localStorage.setItem("userUid", res.user.uid);
          localStorage.setItem("tipoUsuario", "cliente");
          this.avisoRegistro("Bienvenido " + this.usuario.nombre);
          //Insersión del usuario en el firestore
          this.insertarUsuario();
          //Envío de correo para validar cuenta
          this.fireauth.currentUser.then(user => user.sendEmailVerification());
          this.navCtrl.navigateForward('/lavanderias');
        }
      })
        .catch(err => {
          console.log(`login failed ${err}`);
          //this.error = err.message;
        });
      await this.load.dismiss();
    } else {
      this.crearToast("Las contraseñas no coinciden !");
    }
  }

  insertarUsuario() {
    this.firebaseService.insertar("tareas", this.usuario).then(() => {
      console.log('Usuario insertado en la BD correctamente!');
      this.usuario = {} as Usuario;
    }, (error) => {
      console.error(error);
    });
  }

  async consultarDatosUsuario(coleccion, campo, condicion, valor) {
    this.firebaseService.consultar(coleccion, campo, condicion, valor).subscribe((resConsultaUser) => {
      this.usuario = {} as Usuario;
      resConsultaUser.forEach((datosUser: any) => {
        this.idUser = datosUser.payload.doc.id;
        this.usuario = datosUser.payload.doc.data();
      })
    })
  }
}
