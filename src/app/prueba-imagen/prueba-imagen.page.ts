import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-prueba-imagen',
  templateUrl: './prueba-imagen.page.html',
  styleUrls: ['./prueba-imagen.page.scss'],
})
export class PruebaImagenPage implements OnInit {


  /*formTemplate = new FormGroup({
    caption: new FormControl(''),
    category: new FormControl(''),
    imageUrl: new FormControl('')
  });*/

  constructor() { }

  ngOnInit() { }

  /*imgSrc: String = "";
  selectedImage: any = null;

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = "/assets/img/imagePlaceholder.jpg";
      this.selectedImage = null;
    }
  }*/
}
