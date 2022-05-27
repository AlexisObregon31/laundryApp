import { servicio_prenda } from './../interfaces/servicio-prenda';
import { usuario_prenda } from '../interfaces/usuario-prenda';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelServicioPrendaService {

  constructor() { }

  /*servicio_prenda: any = [{
    id: "",
    data: {} as usuario_prenda,
    check: false,
    canti: 1
  }];*/

  private servicio_prenda: servicio_prenda;

  setListaSeleccionada(datos: servicio_prenda) {
    this.servicio_prenda = datos;
  }

  getListaSeleccionada() {
    return this.servicio_prenda;
  }

}
