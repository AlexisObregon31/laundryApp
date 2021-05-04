import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';
import { Firebase } from 'ionic-native';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(public firebase: AngularFireStorage) { }

  /*uploadImage(file: any, path: string, nombre: string): Promise<string> {
    return new Promise(resolve => {
      const filepath = path + '/' + nombre;
      const ref = this.storage.ref(filepath);
      const task = ref.put(file);
    });
  }*/


  /*uploadImage(imageURI) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = this.firebase.storage().ref();
      let imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function (image64) {
        imageRef.putString(image64, 'data_url')
          .then(snapshot => {
            resolve(snapshot.downloadURL)
          }, err => {
            reject(err);
          })
      })
    })
  }*/

}
