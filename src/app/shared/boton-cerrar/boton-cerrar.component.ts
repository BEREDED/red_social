import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boton-cerrar',
  templateUrl: './boton-cerrar.component.html',
  styleUrls: ['./boton-cerrar.component.scss'],
  standalone:false
})
export class BotonCerrarComponent  implements OnInit {

constructor(private router: Router) {}

  ngOnInit() {}

  eliminartkn(){
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/inicio_sesion']);
  }
}
