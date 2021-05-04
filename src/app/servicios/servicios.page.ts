import { NavController } from '@ionic/angular';
import { LoginPage } from './../login/login.page';
import { FirebaseService } from './../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Servicio } from '../interfaces/servicio';





@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  arrayServicios: any = [{
    id: "",
    data: {} as Servicio
  }];

  uidUser: string;
  tipoUser: string;
  campoUser: string;
  user;

  constructor(private firebaseService: FirebaseService, private navCtrl: NavController,) {
    this.uidUser = localStorage.getItem('userUid');
    this.tipoUser = localStorage.getItem('tipoUsuario');
    this.saberTipoUsuario();
    this.obtenerListaServicios();
    //this.formatearFecha();
    //this.consultarUsuario();
  }

  ngOnInit() {
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
    this.servicio = {} as Servicio;
    if (control == "1") {//Si es la primera vez que ingresa
      this.servicio.uid_usu_cliente = this.uidUser;
      this.servicio.nombre_cliente = localStorage.getItem("nombre");
      this.servicio.nombre_empresa = nom_empresa;
      this.consultarDatosUsuario("usuarios", "nombre", "==", nom_empresa);
      console.log("Datos:" + this.servicio.uid_usu_cliente+this.servicio.nombre_cliente+this.servicio.nombre_empresa+this.servicio.uid_usu_empresa);
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
      this.campoUser = "uid_usu_cliente"
    } else {
      if (this.tipoUser == "empresa") {
        this.campoUser = "uid_usu_empresa"
      } else {
        this.campoUser = "";
      }
    }
  }

  /*fecha;
  formatearFecha() {
    this.arrayServicios.forEach(item => {
      this.fecha = item.fecha_hora;
      console.log(item.fecha_hora);
      //item.data.fecha_hora = this.firebaseService.formatoFecha(this.fecha);
    });
  }*/

  //usuario: Usuario;
  consultarDatosUsuario(coleccion, campo, condicion, valor) {
    this.firebaseService.consultar(coleccion, campo, condicion, valor).subscribe((resConsulta) => {
      this.servicio = {} as Servicio;
      resConsulta.forEach((datos: any) => {
        this.servicio.uid_usu_empresa = datos.payload.doc.data().uid;
      })
    });
  }


}
