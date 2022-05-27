import { servicio_prenda } from './../interfaces/servicio-prenda';
import { ModelServicioPrendaService } from '../modelos/model_servicio_prenda';
import { ServicioPrendaPage } from './../servicio-prenda/servicio-prenda.page';
import { Router } from '@angular/router';
import { FirebaseService } from './../services/firebase.service';
import { ModelUsuarioPrendaService } from './../modelos/model_usuario_prenda';
import { usuario_prenda } from './../interfaces/usuario-prenda';
import { ModelUsuarioService } from './../modelos/model_usuario';
import { Usuario } from './../interfaces/usuario';
import { Component, OnInit, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-lavanderia-prenda',
  templateUrl: './lavanderia-prenda.page.html',
  styleUrls: ['./lavanderia-prenda.page.scss'],
})
export class LavanderiaPrendaPage implements OnInit {

  constructor(private model_usuario: ModelUsuarioService,
    private model_servicio_prenda: ModelServicioPrendaService,
    private firebaseService: FirebaseService,
    private router: Router) {
    this.traerDatosUsuario();
    this.listarPrendas();
  }

  ngOnInit() {
  }

  swP = 0;
  servicio_prenda: any = [{ data: {} as servicio_prenda }];
  //listaSeleccionada: any = [{ data: {} as usuario_prenda, check: '', canti: 1, total: 0 }];
  usuario: Usuario;
  usuario_prenda: usuario_prenda;
  array_usuario_prenda: any = [{
    id: "",
    data: {} as usuario_prenda,
  }];



  traerDatosUsuario() {
    this.usuario as Usuario;
    this.usuario = this.model_usuario.getUsuario();
  }

  traerDatosUsuario_Prenda() {
    this.usuario as Usuario;
    this.usuario = this.model_usuario.getUsuario();
  }

  listarPrendas() {
    console.log("Listando Lavanderías");
    this.firebaseService.consultar("usuario_prenda", "id_usuario", "==", this.usuario.uid).subscribe((resConsulta) => {//se busca las prendas que ofrece dicho usuario lavandería
      this.array_usuario_prenda = [];
      resConsulta.forEach((datos: any) => {
        this.array_usuario_prenda.push({
          id: datos.payload.doc.id,
          data: datos.payload.doc.data()
        });
      })
    }).unsubscribe;
    console.log(`Listando prendas: `, this.array_usuario_prenda);
  }

  enviarDatos() {//se envian los datos de la lavavandería seleccionada
    this.model_usuario.setUsuario(this.usuario);
    if (this.swP == 0) {
      this.servicio_prenda.shift();
      this.swP = 1;
    }
    this.model_servicio_prenda.setListaSeleccionada(this.servicio_prenda);
    this.router.navigate(['/servicio-prenda']);
  }

  onCheck(event: any, chdata: any, chId_prenda: any) {
    if (event.detail.checked) {
      this.servicio_prenda.push({
        cantidad: 1,
        check: 'true',
        id_prenda: chId_prenda,
        id_servicio: "",
        obser: "",
        precio: chdata.precio,
        prenda_nombre: chdata.prenda_nombre,
        total: chdata.precio
      });
      console.log(`Lista seleccionada: `, this.servicio_prenda);

    } else if (!event.detail.checked) { //Acción cuando se desmarcar el check
      this.borrarElementoDeArray(this.servicio_prenda, chId_prenda);
      console.log(`Lista seleccionada: `, this.servicio_prenda);
    }
  }

  borrarElementoDeArray(array, valor) {
    console.log(valor);
    this.servicio_prenda = array.filter((elemento) => {
      return elemento.id_prenda !== valor;
    })
  }


}

