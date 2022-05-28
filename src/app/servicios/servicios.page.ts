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

  arrayServicios: any = [{ data: {} as Servicio }];
  //   id: "",

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
    //this.formatearFecha();
    //this.consultarUsuario();
  }

  ngAfterViewInit() {
    this.obtenerListaServicios();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  async obtenerListaServicios() {
    console.log("Obteniendo lista de  Servicios");
    this.firebaseService.consultar("servicios", this.campoUser, "==", this.uidUser).subscribe((resConsulta) => {
      this.arrayServicios = [];
      resConsulta.forEach((datos: any) => {
        //var index = 0;
        var fecha = datos.payload.doc.data().fecha_hora.toDate();
        this.arrayServicios.push({
          id: datos.payload.doc.id,
          delivery: datos.payload.doc.data().delivery,
          estado: datos.payload.doc.data().estado,
          fecha_hora: fecha,
          nombre_cliente: datos.payload.doc.data().nombre_cliente,
          nombre_empresa: datos.payload.doc.data().nombre_empresa,
          obser: datos.payload.doc.data().obser,
          total_general: datos.payload.doc.data().total_general,
          uid_usu_cliente: datos.payload.doc.data().uid_usu_cliente,
          uid_usu_empresa: datos.payload.doc.data().uid_usu_empresa
        });
        //this.arrayServicios[index].data.fecha_hora = fecha;
        //console.log("A ver que sale");
        //console.log(this.arrayServicios[index].data.fecha_hora);
        //index = index + 1;
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
