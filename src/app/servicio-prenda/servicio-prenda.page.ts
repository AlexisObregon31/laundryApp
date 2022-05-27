import { servicio_prenda } from './../interfaces/servicio-prenda';
import { Servicio } from './../interfaces/servicio';
import { ModelServicioPrendaService } from './../modelos/model_servicio_prenda';
import { FirebaseService } from './../services/firebase.service';
import { usuario_prenda } from './../interfaces/usuario-prenda';
import { ModelUsuarioService } from './../modelos/model_usuario';
import { Usuario } from './../interfaces/usuario';
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { getLocaleDateFormat, getLocaleDateTimeFormat } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-servicio-prenda',
  templateUrl: './servicio-prenda.page.html',
  styleUrls: ['./servicio-prenda.page.scss'],
})
export class ServicioPrendaPage implements OnInit {

  constructor(private model_usuario: ModelUsuarioService,
    private modelServicioPrendaService: ModelServicioPrendaService,
    private firebaseService: FirebaseService,
    public alertController: AlertController,
    private navCtrl: NavController) {
    this.traerDatosLavanderia();
    //this.cantidadPrenda = [];
    this.traerServicioPrenda();
    this.calcularTotal();
    console.log(this.array_servicio_prenda);
  }

  ngOnInit() {
  }

  index = 0;
  totalGeneral: number = 0;
  lavanderia: Usuario;
  prendas: any = [{
    id: "",
    data: {} as usuario_prenda,
  }];
  array_servicio_prenda: any = [{} as servicio_prenda];
  swTotal = 0;
  servicio_cab: Servicio;
  idServicio;
  fecha: Date = new Date();
  fechaString: string;

  traerDatosLavanderia() {
    this.lavanderia as Usuario;
    this.lavanderia = this.model_usuario.getUsuario();
  }

  traerServicioPrenda() {
    //this.array_servicio_prenda = [{} as servicio_prenda];
    this.array_servicio_prenda = this.modelServicioPrendaService.getListaSeleccionada();
  }

  asignarCantidad(signo, cantiAsig, index) {
    console.log("Index: " + index);
    if (signo == '+') {
      cantiAsig = cantiAsig + 1;
    } else {
      if (cantiAsig > 1)
        cantiAsig = cantiAsig - 1;
    }
    this.array_servicio_prenda[index] = {
      cantidad: cantiAsig,
      check: this.array_servicio_prenda[index].check,
      id_prenda: this.array_servicio_prenda[index].id_prenda,
      id_servicio: this.array_servicio_prenda[index].id_servicio,
      obser: this.array_servicio_prenda[index].obser,
      precio: this.array_servicio_prenda[index].precio,
      prenda_nombre: this.array_servicio_prenda[index].prenda_nombre,
      total: this.array_servicio_prenda[index].precio * cantiAsig
      //data: this.array_servicio_prenda[index].data,
    }
    console.log(this.array_servicio_prenda[index]);
    this.calcularTotal();
  }

  quitarPrenda(id_Prenda) {
    console.log(id_Prenda);
    this.borrarElementoDeArray(this.array_servicio_prenda, id_Prenda);
    this.calcularTotal();
    console.log(this.array_servicio_prenda);
  }

  borrarElementoDeArray(array, idPrenda) {
    this.array_servicio_prenda = array.filter((elemento) => {
      elemento.cantidad = 1;
      elemento.total = elemento.precio;
      return elemento.id_prenda !== idPrenda;
    })
  }

  calcularTotal() {
    this.totalGeneral = 0;
    this.array_servicio_prenda.forEach(element => {
      this.totalGeneral = this.totalGeneral + element.total;
    });
  }

  async guardarServicio() {
    this.servicio_cab = {} as Servicio;
    this.servicio_cab.estado = 'i';
    this.fecha.toUTCString();
    this.servicio_cab.fecha_hora = this.fecha;
    this.servicio_cab.nombre_cliente = localStorage.getItem("nombre");
    this.servicio_cab.nombre_empresa = this.lavanderia.nombre;
    this.servicio_cab.total_general = this.totalGeneral;
    this.servicio_cab.uid_usu_cliente = localStorage.getItem("userUid");
    this.servicio_cab.uid_usu_empresa = this.lavanderia.uid;

    await this.firebaseService.insertar("servicios", this.servicio_cab).then((regInsert) => {//Insertando Servicio Cabecera
      this.idServicio = regInsert.id;
    }, (error) => {
      console.log(error);
    });

    this.insertarServicioPrenda();//Insertamos las prendas seleccionadas
    this.servicio_cab = {} as Servicio;//Limpiamos datos
  }

  async insertarServicioPrenda() {
    await this.array_servicio_prenda.forEach(item => {
      item.id_servicio = this.idServicio;
      this.firebaseService.insertar("servicio_prenda", item).then((regInsert) => {//Insertando Servicio Cabecera
        console.log(`Item insertado con éxito` + regInsert.id);
      }, (error) => {
        console.log(error);
      });
    });
    this.array_servicio_prenda = [];//Limpiamos datos
    console.log(`Servicio insertado correctamente con ID: `, + this.idServicio);
    this.navCtrl.navigateForward('/servicios');
  }

}//final



/*async alertPrendas() {
    const alert = await this.alertController.create({
      cssClass: 'ion-alert',
      header: 'Seleccione las prendas',
      inputs: this.arrayInput[
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Checkbox 1',
          value: 'value1', //valor
          checked: true
        },
        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Checkbox 3',
          value: 'value3'
        }
      ] ,
      /*buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Aceptar',
        handler: () => {
          console.log('Confirm Ok');
        }
      }]
    });
    await alert.present();
  }*/
