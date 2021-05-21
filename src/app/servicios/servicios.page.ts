import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { LoginPage } from './../login/login.page';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Servicio } from '../interfaces/servicio';
import { FirebaseService } from '../services/firebase.service';





@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit, OnDestroy {

  arrayServicios: any = [{
    id: "",
    data: {} as Servicio
  }];

  uidUser: string;
  tipoUser: string;
  campoUser: string;
  user;
  usuarioValidado: any;

  constructor(private firebaseService: FirebaseService, private navCtrl: NavController, private fireAuth: AngularFireAuth) {
    this.uidUser = localStorage.getItem('userUid');
    this.tipoUser = localStorage.getItem('tipoUsuario');
    this.fireAuth.onAuthStateChanged(user => {
      if (user.emailVerified == true) {
        this.usuarioValidado = true;
        console.log('Email verificado en servicios!' + this.usuarioValidado);
      }
    });
    //console.log("Result" + this.usuarioValidado)
    this.saberTipoUsuario();
    this.obtenerListaServicios();
    //this.formatearFecha();
    //this.consultarUsuario();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  obtenerListaServicios() {
    console.log("Obteniendo lista de  Servicios");
    this.firebaseService.consultar("servicios", this.campoUser, "==", this.uidUser).subscribe((resConsulta) => {
      this.arrayServicios = [];
      resConsulta.forEach((datos: any) => {
        //console.log(datosServicios.payload.doc.data().fecha_hora);
        this.arrayServicios.push({
          id: datos.payload.doc.id,
          data: datos.payload.doc.data()
        });
      })
    });
  }

  servicio: Servicio;
  login: LoginPage;

  clicBotonInsertar(nom_empresa, control) {
    //this.servicio = {} as Servicio;

    if (control == "1") {//Si es la primera vez que ingresa
      this.servicio.uid_usu_cliente = this.uidUser;
      this.servicio.nombre_cliente = localStorage.getItem("nombre");
      this.servicio.nombre_empresa = nom_empresa;

      this.consultarDatosUsuario("usuarios", "nombre", "==", nom_empresa);

      console.log("Datos:" + this.servicio.uid_usu_cliente + this.servicio.nombre_cliente + this.servicio.nombre_empresa + this.servicio.uid_usu_empresa);
      this.navCtrl.navigateForward('/servicio-objeto');
    } else {
      this.firebaseService.insertar("servicios", this.servicio).then(() => {
        console.log('Actualizando Servicios!');
        this.servicio = {} as Servicio;
      }, (error) => {
        console.error(error);
      });
    }
  }

  saberTipoUsuario() {
    if (this.tipoUser == "cliente") {
      this.campoUser = "uid_usu_cliente"//Asigna campo cliente para la consulta a la BD
    } else {
      if (this.tipoUser == "empresa") {
        this.campoUser = "uid_usu_empresa"//Asigna campo empresa para la consulta a la BD
      } else {
        this.campoUser = "";
      }
    }
  }

  consultarDatosUsuario(coleccion, campo, condicion, valor) {
    this.firebaseService.consultar(coleccion, campo, condicion, valor).subscribe((resConsulta) => {
      //this.servicio = {} as Servicio;
      resConsulta.forEach((datos: any) => {
        this.servicio.uid_usu_empresa = datos.payload.doc.data().uid;
      })
    }).unsubscribe();
  }


}
