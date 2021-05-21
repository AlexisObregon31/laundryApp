import { Usuario } from './../interfaces/usuario';
import { FirebaseService } from './../services/firebase.service';
import { UtilService } from './../services/util.service';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})

export class RegistroPage implements OnInit, OnDestroy {

  @ViewChild('inpNombre') inpNombreRef: IonInput;
  @ViewChild('inpControlSeña') inpControlSeñaRef: IonInput;

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
    this.usuario = {} as Usuario; // Asignar valores del modelo a this.usuario, es decir, limpia
    this.crearLoad();
  }

  ngOnInit() {
    this.suscripcion = this.utilservice.getIpAdress().subscribe(text => {
      console.log("Obteniendo IP Adress");
      localStorage.setItem("ip", text);
      this.ipAdress = text;
    })
  }




  ngAfterViewInit() {
    this.inpNombreRef.setFocus().then(res => console.log(res));
    //console.log(this.inpNombreRef);
  }

  async crearLoad() {
    const load = this.loading.create({
      spinner: 'dots'
    });
    (await load).present();
    (await load).dismiss(2000);
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
      //position: posicion,
      buttons: [
        {
          side: 'start',
          icon: 'close-outline',
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



  signup() {
    //Valida contraseñas iguales
    if (this.usuario.nombre || this.usuario.ci_ruc || this.usuario.direccion || this.usuario.email || this.usuario.clave) {
      if (this.usuario.clave == this.controlClave) {
        this.crearLoad();
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
      } else {
        this.inpControlSeñaRef.setFocus();
        this.crearToast("Las contraseñas no coinciden !");
      }
    } else this.crearToast("Debe completar todos los campos !");

  }

  insertarUsuario() {
    this.usuario.ip = this.ipAdress;
    this.usuario.urlFoto = "../../assets/icon/imagePlaceholder.jpg";
    this.firebaseService.insertar("tareas", this.usuario).then(() => {
      console.log('Usuario insertado en la BD correctamente!');
      //this.usuario = {} as Usuario;
    }, (error) => {
      console.error(error);
    });
    this.usuario = {} as Usuario;// Se vuelve a limpiar this.usuario
  }

  async consultarDatosUsuario(coleccion, campo, condicion, valor) {
    this.firebaseService.consultar(coleccion, campo, condicion, valor).subscribe((resConsultaUser) => {
      resConsultaUser.forEach((datosUser: any) => {
        this.idUser = datosUser.payload.doc.id;
        this.usuario = datosUser.payload.doc.data();
      })
    }).unsubscribe();
  }
}
