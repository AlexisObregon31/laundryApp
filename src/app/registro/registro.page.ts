import { ActivatedRoute } from '@angular/router';
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
  load: any;
  tipoRegistro;
  esEmpresa: boolean;

  constructor(
    private fireauth: AngularFireAuth,
    private navCtrl: NavController,
    public alertController: AlertController,
    private utilservice: UtilService,
    private loading: LoadingController,
    private firebaseService: FirebaseService,
    private toastCont: ToastController,
    private activedRoute: ActivatedRoute) {
    this.usuario = {} as Usuario; // Asignar valores del modelo a this.usuario, es decir, limpia
    this.tipoRegistro = this.activedRoute.snapshot.params.tipo;
    if (this.tipoRegistro == 'empresa')
      this.esEmpresa = true;
    else
      false
  }

  ngOnInit() {
    this.suscripcion = this.utilservice.getIpAdress().subscribe(text => {
      this.inpNombreRef.setFocus();
      console.log("Obteniendo IP Adress");
      localStorage.setItem("ip", text);
      this.ipAdress = text;
    })
  }




  ngAfterViewInit() {
  }

  async crearLoad() {
    const load = this.loading.create({
      spinner: 'dots'
    });
    (await load).present();
    //(await this.load).dismiss(2000);
  }

  async cerrarLoad() {
    return await this.loading.dismiss();
  }

  usuario: Usuario;

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  async avisoRegistro(mensaje: string) {
    const alert = await this.alertController.create({
      cssClass: 'ion-alert',
      header: mensaje,
      subHeader: "Para continuar, verifique el correo enviado para validar su cuenta !",
      //message: 'Registro de Usuario exitoso !',
      buttons: ['OK']
    });
    await alert.present();
  }

  async crearToast(message: string) {
    const toast = await this.toastCont.create({
      //header: mensage,
      position: "top",
      message,
      color: 'warning',
      duration: 3000,
      cssClass: "ion-toast",
      //message: 'Click to Close',
      //position: posicion,
      buttons: [
        {
          side: 'start',
          icon: 'close-outline'
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
    //this.crearLoad();
    //Valida contraseñas iguales
    if (this.usuario.nombre || this.usuario.ci_ruc || this.usuario.direccion || this.usuario.email || this.usuario.clave) {
      if (this.usuario.clave == this.controlClave) {
        //this.usuario = {} as Usuario;
        this.fireauth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.clave).then(res => {
          if (res.user) {
            this.usuario.uid = res.user.uid;
            this.usuario.tipo = this.tipoRegistro;
            console.log("Registro con éxito el User = " + res.user.uid);
            localStorage.setItem("userUid", res.user.uid);
            localStorage.setItem("tipoUsuario", this.tipoRegistro);
            this.insertarUsuario();
            this.fireauth.currentUser.then(user => user.sendEmailVerification());
            this.cerrarLoad();
            this.avisoRegistro("Registro exitoso");
            //Insersión del usuario en el fires
            //Envío de correo para validar cuenta
            this.navCtrl.navigateForward('/login');
          }
        })
          .catch(error => {
            console.log(`Error al intentar Registrar ${error}`);
            console.log(error.code);
            //this.errorMensaje = error.message;
            if (error.code == "auth/invalid-email")
              this.crearToast("Ingrese un email valido !");
            else {
              if (error.code == "auth/weak-password")
                this.crearToast("La seña debe ser mayor a 6 caracteres !");
              else {
                if (error.code == "auth/email-already-in-use")
                  this.crearToast("Este correo ya está registrado !");
              }
            }
          });
      } else {
        //this.cerrarLoad();
        this.inpControlSeñaRef.setFocus();
        this.crearToast("Las señas no coinciden!");
      }
      //this.cerrarLoad();
    } else this.crearToast("Debe completar todos los campos !");
  }
  errorMensaje: string;
  insertarUsuario() {
    this.usuario.ip = this.ipAdress;
    this.usuario.urlFoto = "../../assets/icon/imagePlaceholder.jpg";
    this.firebaseService.insertar("usuarios", this.usuario).then(() => {
      console.log('Usuario insertado en la BD correctamente!');
      //this.usuario = {} as Usuario;
    }, (error) => {
      console.log(error);
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
