import { FirebaseService } from './../services/firebase.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestorageService } from './../services/firestorage.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { Usuario } from '../interfaces/usuario';



@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit, OnDestroy {

  usuario: Usuario;
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  perfil: any;
  usuNombre;
  imagenUrlPerfil;
  emailPerfil;

  consultarDatos;
  usuEmail: any;
  usuUrlFoto: any;
  usuCelular: any;
  usuDireccion: any;

  constructor(
    private fireauth: AngularFireAuth,
    private navCtrl: NavController,
    public alertController: AlertController,
    private firestorageService: FirestorageService,
    private database: AngularFirestore,
    private firebaseService: FirebaseService
  ) { this.consultarDatosUsuario("usuarios", "uid", "==", localStorage.getItem("userUid")); }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  /*cargarDatos() {
    this.fireauth.onAuthStateChanged(res => {
      console.log("AUTH_USER", res);
      if (res) {
        //const result = this.database.doc(`/usuarios/${localStorage.getItem("userUid")}`);
        //this.consultarDatosUsuario('usuarios', 'uid', '=', localStorage.getItem("userUid"));
        var userProfile = result.valueChanges();
        userProfile.subscribe(perfil => {
          console.log("Perfil:", perfil);
          this.nombrePerfil = perfil['nombre'];
          this.imagenUrlPerfil = perfil['urlFoto'];
          this.emailPerfil = perfil['email'];
        })
      }
    });
  }*/


  consultarDatosUsuario(coleccion, campo, condicion, valor) {

    this.firebaseService.consultar(coleccion, campo, condicion, valor).subscribe((resConsultaUser) => {
      this.usuario = {} as Usuario;
      resConsultaUser.forEach((datosUser: any) => {
        this.usuNombre = datosUser.payload.doc.data().nombre;
        this.usuEmail = datosUser.payload.doc.data().email;
        this.usuUrlFoto = datosUser.payload.doc.data().urlFoto;
        this.usuCelular = datosUser.payload.doc.data().celular;
        this.usuDireccion = datosUser.payload.doc.data().direccion;
        console.log(this.usuNombre + " - " + this.usuEmail);
      })
    });

    this.fireauth.onAuthStateChanged(res => {
      console.log("AUTH_USER", res);
    });

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
