import { ModelPrendaSeleccionadaService } from './../modelos/model_prenda_seleccionada';
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
    private model_prenda_seleccionada: ModelPrendaSeleccionadaService,
    private firebaseService: FirebaseService,
    private router: Router) {
    this.traerDatosUsuario();
    this.listarPrendas();
  }

  ngOnInit() {
  }

  swP = 0;
  listaSeleccionada: any = [{ data: {} as usuario_prenda, check: '', canti: 1, total: 0 }];
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
      this.listaSeleccionada.shift();
      this.swP = 1;
    }
    this.model_prenda_seleccionada.setListaSeleccionada(this.listaSeleccionada);
    this.router.navigate(['/servicio-prenda']);
  }

  onCheck(event: any, chdata: any, chId: any) {
    if (event.detail.checked) {
      this.listaSeleccionada.push({
        id: chId,
        data: chdata,
        check: 'true',
        canti: 1,
        total: chdata.precio
      });
      console.log(`Lista seleccionada: `, this.listaSeleccionada);

    } else if (!event.detail.checked) { //Acción cuando se desmarcar el check
      this.borrarElementoDeArray(this.listaSeleccionada, chId);
      console.log(`Lista seleccionada: `, this.listaSeleccionada);
    }
  }

  borrarElementoDeArray(array, valor) {
    console.log(valor);
    this.listaSeleccionada = array.filter((elemento) => {
      return elemento.id !== valor;
    })
  }


}

