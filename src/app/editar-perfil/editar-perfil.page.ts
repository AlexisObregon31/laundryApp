import { TransferirDatosService } from './../services/transferir-datos.service';
import { Router } from '@angular/router';
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
  idUser: any;

  consultarDatos;

  constructor(
    private fireauth: AngularFireAuth,
    private navCtrl: NavController,
    public alertController: AlertController,
    private firestorageService: FirestorageService,
    private database: AngularFirestore,
    private firebaseService: FirebaseService,
    private router: Router,
    private transferirDatosService: TransferirDatosService
  ) {
    this.consultarDatosUsuario("usuarios", "uid", "==", localStorage.getItem("userUid"));
    this.usuario = {} as Usuario;
  }

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
        this.idUser = datosUser.payload.doc.id;
        console.log("El ID del usuario es: " + this.idUser);
        this.usuario.nombre = datosUser.payload.doc.data().nombre;
        console.log(this.usuario.nombre);
        this.usuario.email = datosUser.payload.doc.data().email;
        this.usuario.urlFoto = datosUser.payload.doc.data().urlFoto;
        this.usuario.celular = datosUser.payload.doc.data().celular;
        this.usuario.direccion = datosUser.payload.doc.data().direccion;
        console.log(this.usuario);
      })
    })

    this.fireauth.onAuthStateChanged(res => {
      console.log("AUTH_USER", res);
    });

  }

  goToAmpliarImagen() {
    this.transferirDatosService.enviarObjetoStruc(this.usuario);
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
