import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface imageData {
  fileName: string;
  filePath: string;
  size: string;
}

@Component({
  selector: 'app-imagen-prueba',
  templateUrl: './imagen-prueba.page.html',
  styleUrls: ['./imagen-prueba.page.scss'],
})
export class ImagenPruebaPage implements OnInit {

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

  constructor(private database: AngularFirestore,
    private storage: AngularFireStorage,
    private loading: LoadingController,
    private fireauth: AngularFireAuth) {
    this.isLoading = false;
    this.isLoaded = false;
  }

  ngOnInit() {
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
