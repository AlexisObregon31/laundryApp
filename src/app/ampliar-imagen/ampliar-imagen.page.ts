import { TransferirDatosService } from './../services/transferir-datos.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

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
  usuario: Usuario;

  constructor(private database: AngularFirestore,
    private storage: AngularFireStorage,
    private loading: LoadingController,
    private fireauth: AngularFireAuth,
    private transferirDatosService: TransferirDatosService) {
    this.isLoading = false;
    this.isLoaded = false;
    //console.log("Usuario en ampliar.ts: " + this.usuario);
  }

  ngOnInit() {
    //this.usuario = {} as Usuario;
    this.transferirDatosService.$getObjetoStruc.subscribe(res => {
      this.usuario = {} as Usuario;
      this.usuario.nombre = res.nombre;
    }).unsubscribe();
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
    this.loading.dismiss();
    this.percentage = this.subirImagen.percentageChanges();

    this.subirImagen.then(res => {
      var archivoImagen = res.task.snapshot.ref.getDownloadURL();
      archivoImagen.then(urlDescargable => {
        console.log('URL', urlDescargable);
        this.database.doc(`usuarios/${localStorage.getItem("userUid")}`).update({ // Cambiar este método al de la guía del profe, llevar estas funciones al editar-perfil.page para allí consultar ya el id tambien al momento de iniciar así cuando se quiera modificar ya se pase el id del documento.
          urlFoto: urlDescargable
        });
      })
    })
  }

}
