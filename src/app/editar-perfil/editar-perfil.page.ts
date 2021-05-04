import { FirestorageService } from './../services/firestorage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  //user: string = "";
  //userProfile = Firebase.database().ref('/userProfile');

  /*@ViewChild('filebtn') filebtn: {
    nativeElement: HTMLInputElement
  };*/


  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  constructor(
    private fireauth: AngularFireAuth,
    private navCtrl: NavController,
    public alertController: AlertController,
    private firestorageService: FirestorageService
  ) { }

  ngOnInit() { }


  /*async newImageUpload(event: any) {
    const path = 'usuarios';
    const nombre = 'prueba';
    const file = event.target.files[0];
    const res = await this.firestorageService.uploadImage(file, path, nombre);
    console.log('Recibiendo res de la promesa=  ', res);
  }*/


  /*updateUsername() {
    this.user.updateProfile({displayName: this.username}).then((data) => {
        console.log(data);
        this.username = '';
        this.presentToast('Nombre de usuario modificado !', 'bottom', 1000);
        this.error = '';
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }

  updateImage() {

    this.user.updateProfile({
      photoURL: `https://picsum.photos/id/${this.image}/200/200`
    })
      .then((data) => {
        console.log(data);
        this.image = null;
        this.presentToast('Image updated', 'bottom', 1000);
        this.error = '';
      })
      .catch(err => {
        console.log(` failed ${err}`);
        this.error = err.message;
      });
  }
  async presentToast(message, position, duration) {
    const toast = await this.toastController.create({
      message,
      duration,
      position
    });
    toast.present();
  }*/


  logout() {
    this.fireauth.signOut().then(() => {
      this.navCtrl.navigateForward('/lavanderias');
      localStorage.removeItem('userUid');
      localStorage.removeItem('emailUser');
      localStorage.removeItem('tipoUsuario');
      console.log('Cerrando sesion...');
    });
  }

}
