import { ModelPrendaSeleccionadaService } from './../modelos/model_prenda_seleccionada';
import { LavanderiaPrendaPage } from './../lavanderia-prenda/lavanderia-prenda.page';
import { FirebaseService } from './../services/firebase.service';
import { usuario_prenda } from './../interfaces/usuario-prenda';
import { ModelUsuarioService } from './../modelos/model_usuario';
import { Usuario } from './../interfaces/usuario';
import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { IonList, AlertController } from '@ionic/angular';

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
    private modelListaSeleccionada: ModelPrendaSeleccionadaService,
    private firebaseService: FirebaseService,
    public alertController: AlertController) {
    this.traerDatosLavanderia();
    //this.cantidadPrenda = [];
    this.traerListaPrendas();
    this.calcularTotal();
    console.log(this.listaPrenda);
  }

  ngOnInit() {
  }

  //cantidadPrenda: any = [{ index: '', canti: '', id: '' , total: ''}];
  index = 0;
  totalGeneral: number = 0;
  //idInput: number = 0;
  //itemPrenda: itemCanti;
  lavanderia: Usuario;
  prendas: any = [{
    id: "",
    data: {} as usuario_prenda,
  }];
  listaPrenda: any = [];
  swTotal = 0;

  traerDatosLavanderia() {
    this.lavanderia as Usuario;
    this.lavanderia = this.model_usuario.getUsuario();
  }

  traerListaPrendas() {
    this.listaPrenda = [];
    this.listaPrenda = this.modelListaSeleccionada.getListaSeleccionada();
  }

  asignarCantidad(signo, cantiAsig, index) {
    console.log("Index: " + index);
    if (signo == '+') {
      cantiAsig = cantiAsig + 1;
    } else {
      if (cantiAsig > 1)
        cantiAsig = cantiAsig - 1;
    }
    this.listaPrenda[index] = {
      id: this.listaPrenda[index].id,
      data: this.listaPrenda[index].data,
      check: this.listaPrenda[index].check,
      canti: cantiAsig,
      total: this.listaPrenda[index].data.precio * cantiAsig
    }
    console.log(this.listaPrenda[index]);
    this.calcularTotal();
  }

  quitarPrenda(idPrenda) {
    console.log(idPrenda);
    this.borrarElementoDeArray(this.listaPrenda, idPrenda);
    this.calcularTotal();
    console.log(this.listaPrenda);
  }

  borrarElementoDeArray(array, idPrenda) {
    this.listaPrenda = array.filter((elemento) => {
      return elemento.id !== idPrenda;
    })
  }

  calcularTotal() {
    this.totalGeneral = 0;
    this.listaPrenda.forEach(element => {
      this.totalGeneral = this.totalGeneral + element.total;
    });
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
