import { usuario_prenda } from './../interfaces/usuario-prenda';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelPrendaSeleccionadaService {

  constructor() { }

  array_usuario_prenda: any = [{
    id: "",
    data: {} as usuario_prenda,
    check: false,
    canti: 1
  }];

  setListaSeleccionada(lista: any) {
    this.array_usuario_prenda = lista;
  }

  getListaSeleccionada() {
    return this.array_usuario_prenda;
  }

}
