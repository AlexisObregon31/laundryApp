import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  constructor(private httpClient: HttpClient) { }

  getIpAdress = () => {
    return this.httpClient.get('https://api.ipify.org/', {responseType:'text'});
  }

  }
