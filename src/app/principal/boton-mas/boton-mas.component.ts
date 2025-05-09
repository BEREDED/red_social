import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boton-mas',
  templateUrl: './boton-mas.component.html',
  styleUrls: ['./boton-mas.component.scss'],
  standalone:false
})
export class BotonMasComponent  implements OnInit {

  ngOnInit(): void {
    // Puedes dejarlo vacío o usarlo más adelante
  }
    desplegado = false;
  constructor(private router: Router) {}

  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }

  crearForo() {
    console.log('Crear foro');
    this.router.navigate(['/crear-foro']);
  }

  crearGrupo() {
    console.log('Crear grupo');
    this.router.navigate(['/crear-grupo']);
  }

}
