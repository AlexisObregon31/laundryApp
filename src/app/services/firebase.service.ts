import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  userData: any;

  constructor(public angularFirestore: AngularFirestore) { }

  public insertar(coleccion, datos) {
    return this.angularFirestore.collection(coleccion).add(datos);
  }

  public consultar(coleccion, campo, condicion, valor) {
    if (campo != "") { //Si se recibe un campo para la condicion where
      return this.angularFirestore.collection(coleccion, ref => ref.where(campo, condicion, valor)).snapshotChanges();
    } else { // Si el campo viene vacío se ejecuta esto
      return this.angularFirestore.collection(coleccion).snapshotChanges();
    }
  }

  formatoFecha(fecha): string {
    const dia = fecha.getDay();
    const mes = fecha.getMonth();
    const año = fecha.getFullYear();
    return '${dia}-${mes}-${año}';
  }

  /*public consultaSimple(coleccion, campo, condicion, valor) { //Fue agregado en la función consultar
    return this.angularFirestore.collection(coleccion, ref => ref.where(campo, condicion, valor)).get();
  }*/
}

