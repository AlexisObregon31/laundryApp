import { ModelUsuarioService } from './../modelos/model_usuario';
import { AmpliarImagenPage } from './../ampliar-imagen/ampliar-imagen.page';
import { Router } from '@angular/router';
import { FirebaseService } from './../services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestorageService } from './../services/firestorage.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController, LoadingController, IonButton, IonInput, ToastController } from '@ionic/angular';
import { Usuario } from '../interfaces/usuario';
//import { TransferirDatosService } from '../services/transferir-datos.service';



@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit, OnDestroy {

  @ViewChild('inpNombre') inpNombreRef: IonInput;


  usuario: Usuario;
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  perfil: any;
  idUser: any;
  consultarDatos;
  readOnly: boolean = true;
  txtBtn: string = "Editar";
  swBtn = "e";

  constructor(
    private fireauth: AngularFireAuth,
    private navCtrl: NavController,
    public alertController: AlertController,
    private firestorageService: FirestorageService,
    private database: AngularFirestore,
    private firebaseService: FirebaseService,
    private router: Router,
    private loading: LoadingController,
    private model_usuario: ModelUsuarioService,
    private toastCont: ToastController) {
    this.consultarDatosUsuario("usuarios", "uid", "==", localStorage.getItem("userUid"));
    this.usuario = {} as Usuario;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
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
      buttons: [
        {
          side: 'start',
          icon: 'checkbox-sharp'
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

  editarDatos() {
    if (this.swBtn == "e") {
      this.readOnly = false;
      this.inpNombreRef.setFocus();
      this.swBtn = "g";
      this.txtBtn = "Guardar"

    } else {//guardar
      console.log("Nombre ahora: " + this.usuario.nombre);
      this.readOnly = true;
      this.database.doc(`usuarios/${this.idUser}`).update(this.usuario);
      this.crearToast("Se han modificado los datos");
      this.swBtn = "e";
      this.txtBtn = "Editar"
    }
  }


  async consultarDatosUsuario(coleccion, campo, condicion, valor) {
    const load = await this.loading.create({
      spinner: 'dots',
    });

    this.firebaseService.consultar(coleccion, campo, condicion, valor).subscribe((resConsultaUser) => {
      load.present();
      this.usuario = {} as Usuario;
      resConsultaUser.forEach((datosUser: any) => {
        this.idUser = datosUser.payload.doc.id;
        console.log("El ID del usuario es: " + this.idUser);
        this.usuario = datosUser.payload.doc.data();
        /*this.usuario.nombre = datosUser.payload.doc.data().nombre;
        this.usuario.email = datosUser.payload.doc.data().email;
        this.usuario.urlFoto = datosUser.payload.doc.data().urlFoto;
        this.usuario.celular = datosUser.payload.doc.data().celular;
        this.usuario.direccion = datosUser.payload.doc.data().direccion;*/
        console.log("Datos usuario al consultar" + this.usuario);
      })
      load.dismiss();
    })

    this.fireauth.onAuthStateChanged(res => {
      console.log("AUTH_USER", res.uid);
    });

  }

  goToAmpliarImagen() {
    //this.transferirDatosService.enviarObjetoStruc(this.usuario);
    //this.ampliarImagenPage;
    //this.ampliarImagenPage.recibirUrlFoto(this.usuario.urlFoto);
    //this.transferirDatosService.setDato(this.usuario.urlFoto);
    this.model_usuario.setUsuario(this.usuario);
    this.router.navigate(['/ampliar-imagen/' + this.idUser]);

  }


  logout() {
    this.fireauth.signOut().then(() => {
      this.navCtrl.navigateForward('/lavanderias');
      localStorage.removeItem('userUid');
      localStorage.removeItem('emailUser');
      localStorage.removeItem('tipoUsuario');
      console.log('Cerrando sesion...');
    });
  }

}
