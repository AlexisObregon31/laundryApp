import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class ModelUsuarioService {


  constructor() { }

  private dato: string;
  public setDato(valor: string) {
    this.dato = valor;
  }
  public getDato() {
    return this.dato;
  }


  private usuario: Usuario;
  public setUsuario(datos: Usuario) {
    //this.usuario: {} as Usuario;
    this.usuario = datos;
  }

  public getUsuario() {
    return this.usuario;
  }
}
