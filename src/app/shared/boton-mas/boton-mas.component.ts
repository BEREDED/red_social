import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boton-mas',
  templateUrl: './boton-mas.component.html',
  styleUrls: ['./boton-mas.component.scss'],
  standalone:false
})
export class BotonMasComponent  implements OnInit {

  desplegado = false;
  showCrearForoModal = false;
  foroName: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Puedes dejarlo vacío o usarlo más adelante
  }

  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }

  openCrearForoModal() {
    console.log('openCrearForoModal called');
    this.showCrearForoModal = true;
    this.desplegado = false;
  }

  closeCrearForoModal() {
    this.showCrearForoModal = false;
    this.foroName = '';
  }

  crearForo() {
    console.log('Crear foro:', this.foroName);
    // Add foro creation logic here
    this.closeCrearForoModal();
  }

  crearGrupo() {
    console.log('Crear grupo');
    this.router.navigate(['/crear-grupo']);
  }

}
