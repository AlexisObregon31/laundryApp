import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class TransferirDatosService {
  

  constructor() { }

  private dato: string;

  public setDato(valor: string) {
    this.dato = valor;
  }
  public getDato() {
    return this.dato;
  }
}
