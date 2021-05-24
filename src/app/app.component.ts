import { Component } from '@angular/core';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  public selectedIndex = 0;
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  public dirigirPage: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private fireAuth: AngularFireAuth,
    private navCtrl: NavController,
    private loading: LoadingController) {
  }

  async validarUsuario() {

    const load = await this.loading.create({
      spinner: 'dots',
    });
    load.present();

    this.fireAuth.onAuthStateChanged(user => {
      console.log("Result user" + user);
      if (user == null) {
        //alert
        this.navCtrl.navigateForward('/registro');
      } else {
        if (user.emailVerified == true) {
          this.navCtrl.navigateForward('/servicios');
          console.log("Redirigiendo a Servicios, Resp: " + user.emailVerified);
          //this.dirigirPage = true;
          //console.log('Email verificado en el app.ts' + this.dirigirPage);
        } else this.navCtrl.navigateForward('/validar-usuario');
      }
    });

    /*if (this.dirigirPage == true) {
      //this.navCtrl.navigateForward('/servicios');
      //console.log("Redirigiendo a Servicios, Resp: " + this.dirigirPage);
    } else {
      //this.navCtrl.navigateForward('/validar-usuario');
      //console.log("REdirigiendo a Validar Usuario, Resp: " + this.dirigirPage);
    }*/
    load.dismiss();
  }
}

