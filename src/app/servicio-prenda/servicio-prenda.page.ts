import { FirebaseService } from './../services/firebase.service';
import { usuario_prenda } from './../interfaces/usuario-prenda';
import { ModelUsuarioService } from './../modelos/model_usuario';
import { Usuario } from './../interfaces/usuario';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonList, AlertController } from '@ionic/angular';
import { identifierModuleUrl } from '@angular/compiler';

export interface itemCanti {
  item: number;
  canti: number;
}

export interface inputAlert {
  id: number;
  name: string;
  type: string;
  value: string;
  checked: boolean;
}

@Component({
  selector: 'app-servicio-prenda',
  templateUrl: './servicio-prenda.page.html',
  styleUrls: ['./servicio-prenda.page.scss'],
})
export class ServicioPrendaPage implements OnInit {

  @ViewChild('listaPrendas') listaPrendasRef: IonList;

  constructor(private model_usuario: ModelUsuarioService,
    private firebaseService: FirebaseService,
    public alertController: AlertController) {
    this.traerDatosLavanderia();
    //this.listarPrendas();
    this.cantidadPrenda = [];
    //this.alertPrendas();
  }

  ngOnInit() {
  }

  cantidadPrenda: any = [{ data: {} as itemCanti }];
  idInput: number = 0;
  arrayInput: any = [{
    id: '',
    name: '',
    type: '',
    value: '',
    checked: ''
  }];
  itemPrenda: itemCanti;
  lavanderia: Usuario;
  prendas: any = [{
    id: "",
    data: {} as usuario_prenda,
  }];

  traerDatosLavanderia() {
    this.lavanderia as Usuario;
    this.lavanderia = this.model_usuario.getUsuario();
  }

  listarPrendas() {
    console.log("Listando Prendas de " + this.lavanderia.nombre);
    this.firebaseService.consultar("usuario_prenda", "id_usuario", "==", this.lavanderia.uid).subscribe((resConsulta) => {//se busca las prendas que ofrece dicho usuario lavandería
      this.prendas = [];
      resConsulta.forEach((datos: any) => {
        this.prendas.push({
          id: datos.payload.doc.id,
          data: datos.payload.doc.data()

        });
        //console.log(this.prendas.data.prenda_nombre);
      })
    });
    console.log(this.prendas.data);
    this.prepararAlertPrendas();
  }

  prepararAlertPrendas() {
    this.arrayInput = [];
    this.prendas.forEach((prenda: any) => {
      console.log(prenda.data);
      this.idInput += 1;
      console.log(this.arrayInput);
      this.arrayInput.push({
        id: this.idInput,
        name: 'ch' + this.idInput,
        type: 'checkbox',
        //label: 'Checkbox 1',
        value: prenda.data.prenda_nombre, //valor
        checked: false
      });
    });
    this.alertPrendas();
  }

  async alertPrendas() {
    const alert = await this.alertController.create({
      cssClass: 'ion-alert',
      header: 'Seleccione las prendas',
      inputs: this.arrayInput/*[ // asignar propiedades del input
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Checkbox 1',
          value: 'value1', //valor
          checked: true
        },
        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Checkbox 2',
          value: 'value2'
        },
        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Checkbox 3',
          value: 'value3'
        }
      ]*/ ,
      buttons: [{
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
  }


  asignarCantidad(item: number, canti: number, signo: any) {

    if (signo == '+')
      canti = + 1;
    else {
      if (canti > 0)
        canti = -1;
    }

    this.itemPrenda as itemCanti;
    this.itemPrenda.item = item;
    this.itemPrenda.canti = canti;
    this.cantidadPrenda.push(
      this.cantidadPrenda.data = this.itemPrenda
    );

  }
}
