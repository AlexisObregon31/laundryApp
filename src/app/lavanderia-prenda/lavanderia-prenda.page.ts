import { Router } from '@angular/router';
import { FirebaseService } from './../services/firebase.service';
import { ModelUsuarioPrendaService } from './../modelos/model_usuario_prenda';
import { usuario_prenda } from './../interfaces/usuario-prenda';
import { ModelUsuarioService } from './../modelos/model_usuario';
import { Usuario } from './../interfaces/usuario';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lavanderia-prenda',
  templateUrl: './lavanderia-prenda.page.html',
  styleUrls: ['./lavanderia-prenda.page.scss'],
})
export class LavanderiaPrendaPage implements OnInit {

  constructor(private model_usuario: ModelUsuarioService,
    private model_usuario_prenda: ModelUsuarioPrendaService,
    private firebaseService: FirebaseService,
    private router: Router) {
    this.traerDatosUsuario();
    this.listarPrendas();
  }

  ngOnInit() {
  }

  listaSeleccionada: any = [{ data: {} as usuario_prenda, check: '' }];
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
    // tslint:disable-next-line: no-unused-expression
    this.firebaseService.consultar("usuario_prenda", "id_usuario", "==", this.usuario.uid).subscribe((resConsulta) => {//se busca las prendas que ofrece dicho usuario lavandería
      this.array_usuario_prenda = [];
      resConsulta.forEach((datos: any) => {
        this.array_usuario_prenda.push({
          id: datos.payload.doc.id,
          data: datos.payload.doc.data()
        });
      })
    }).unsubscribe;
    console.log(this.array_usuario_prenda.data);
  }

  enviarDatos() {//se envian los datos de la lavavandería seleccionada
    this.model_usuario.setUsuario(this.usuario);
    this.router.navigate(['/servicio-prenda']);
  }

  onCheck(event: any, chdata: any, chId: any) {
    if (event.detail.checked) {
      this.listaSeleccionada.push({
        data: chdata,
        id: chId,
        check: 'true'
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

