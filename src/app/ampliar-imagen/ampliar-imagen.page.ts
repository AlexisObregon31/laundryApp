import { ModelUsuarioService } from './../modelos/model_usuario';
import { FirebaseService } from './../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
//import { TransferirDatosService } from '../services/transferir-datos.service';
import { ToastController } from '@ionic/angular';

export interface imageData {
  fileName: string;
  filePath: string;
  size: string;
}

@Component({
  selector: 'app-ampliar-imagen',
  templateUrl: './ampliar-imagen.page.html',
  styleUrls: ['./ampliar-imagen.page.scss'],
})

export class AmpliarImagenPage implements OnInit {

  //@ViewChild('foto') foto;

  fileName: string;
  fileSize: string;
  isLoading: boolean;
  isLoaded: boolean;
  private coleccionImagen: AngularFirestoreCollection<imageData>;
  imagefile: Observable<imageData[]>;
  subirImagen: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  subirArchivoImagen: Observable<any>;
  authservice: any;
  urlFoto;
  nombre;
  idUser;
  usuario: Usuario;
  //styleDocument = document.documentElement.style;
  styleDivFoto;
  //foto = document.documentElement.style.

  constructor(private database: AngularFirestore,
    private storage: AngularFireStorage,
    private loading: LoadingController,
    private fireauth: AngularFireAuth,
    private activedRoute: ActivatedRoute,
    private modelUsuario: ModelUsuarioService,
    private firestoreService: FirebaseService,
    private router: Router,
    private toastCont: ToastController) {
    this.isLoading = false;
    this.isLoaded = false;
    this.usuario = this.modelUsuario.getUsuario();
    this.idUser = this.activedRoute.snapshot.params.id;
    console.log(this.idUser + " - " + this.usuario.urlFoto + "-" + this.usuario.nombre);
    this.styleDivFoto = "height: " + (screen.height - 200) + "px; " +
      "background: url('" + this.usuario.urlFoto + "'); max-width: 100 %; display: block; align-items: center; " +
      " background-size: cover; background-position: center center; margin: 0 auto; top: 4.5em;";
    console.log("Tamaño de largo " + this.styleDivFoto);
    //this.foto.setProperty("max-height", this.heightScreen);
  }

  ngOnInit() {
  }

  async crearToast(mensage: string) {
    const toast = await this.toastCont.create({
      //header: mensage,
      position: "top",
      color: 'warning',
      duration: 2000,
      cssClass: "ion-toast",
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

  async subirImagenAlFirebase(event) {
    const load = await this.loading.create({
      spinner: 'dots',
    });

    load.present();


    const file = event.target.files;
    console.log("Archivo:" + file);
    var fileName = file[0];
    console.log(fileName);

    if (fileName.type.split('/')[0] !== "image") {
      console.error("El archivo no es una imagen");
      return;
    }

    const path = `usuariosPerfil/${new Date().getTime()}_${fileName.name}`;
    var fileRef = this.storage.ref(path);

    this.subirImagen = this.storage.upload(path, fileName);
    load.dismiss();
    this.percentage = this.subirImagen.percentageChanges();

    this.subirImagen.then(res => {
      var archivoImagen = res.task.snapshot.ref.getDownloadURL();
      archivoImagen.then(urlDescargable => {
        console.log('URL', urlDescargable);
        this.database.doc(`usuarios/${this.idUser}`).update({
          urlFoto: urlDescargable
        });
      })
    })
    this.crearToast('  Imagen editada');
    this.router.navigate(['/editar-perfil']);
  }

  eliminarFoto() {
    this.usuario.urlFoto = "https://firebasestorage.googleapis.com/v0/b/app-laundry-48877.appspot.com/o/usuariosPerfil%2F1621222198208_imagePlaceholder.jpg?alt=media&token=c0f98f4f-58f5-4a45-8920-1748f3447a70";
    //this.transferirDatosService.setUsuario(this.usuario);
    this.crearToast('  Imagen Eliminada');
    this.router.navigate(['/editar-perfil']);
    this.firestoreService.actualizar("usuarios", this.idUser, this.usuario).then(() => {
      // Actualizar la lista completa
      console.log('Perfil actualizado')
      // Limpiar datos de pantalla
      //this.tareaEditando = {} as Tarea;
    })
  }
}
