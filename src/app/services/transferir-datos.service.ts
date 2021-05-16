import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferirDatosService {
  private objetoStruc = new BehaviorSubject<{}>({});
  $getObjetoStruc = this.objetoStruc.asObservable();

  constructor() { }

  enviarObjetoStruc(data: any) {
    this.objetoStruc.next(data);
  }
}
