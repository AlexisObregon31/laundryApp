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

  constructor(private database: AngularFirestore, private storage: AngularFireStorage) {
    this.isLoading = false;
    this.isLoaded = false;
  }

  ngOnInit() {
  }


  subirImagenAlFirebase(event) {
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
  }

}
