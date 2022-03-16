import { Lavanderia } from './../interfaces/lavanderia';
import { FirebaseService } from './../services/firebase.service';
import { LoadingController, NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lavanderias',
  templateUrl: './lavanderias.page.html',
  styleUrls: ['./lavanderias.page.scss'],
})
export class LavanderiasPage implements OnInit {

  arrayLavanderias: any = [{
    id: "",
    data: {} as Lavanderia
  }];

  constructor(private loading: LoadingController,
    private navCtrl: NavController,
    private firebaseService: FirebaseService) {
    this.listarLavanderias();
  }

  ngOnInit() {
  }
  emailUser;
  usuarioLogueado;

  async btnUsuario() {
    this.emailUser = localStorage.getItem("emailUser");
    console.log('Esta logueado el usuario? -->  ' + this.emailUser);

    const load = await this.loading.create({
      spinner: 'dots',
    });
    load.present();

    if (this.emailUser != null) {
      this.navCtrl.navigateForward('/editar-perfil');
    } else {
      this.navCtrl.navigateForward('/login');
    }
    load.dismiss();
  }

  listarLavanderias() {
    console.log("Listando Lavanderías");
    this.firebaseService.consultar("usuarios", "tipo", "==", "empresa").subscribe((resConsulta) => {
      this.arrayLavanderias = [];
      resConsulta.forEach((datos: any) => {
        //console.log(datosServicios.payload.doc.data().fecha_hora);
        this.arrayLavanderias.push({
          id: datos.payload.doc.id,
          data: datos.payload.doc.data()
        });
      })
    });
    console.log(this.arrayLavanderias.data);
  }

  clicBotonVerEmpresa() {

  }

}
