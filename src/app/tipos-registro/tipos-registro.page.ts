import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipos-registro',
  templateUrl: './tipos-registro.page.html',
  styleUrls: ['./tipos-registro.page.scss'],
})
export class TiposRegistroPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  irAlRegistro(pantalla) {
    if (pantalla == "usuario")
      this.router.navigate(['/registro/' + pantalla]);
    else
      this.router.navigate(['/registro/' + pantalla]);

  }

}
