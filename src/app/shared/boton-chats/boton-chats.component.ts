import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-boton-chats',
  templateUrl: './boton-chats.component.html',
  styleUrls: ['./boton-chats.component.scss'],
  standalone:false
})
export class BotonChatsComponent  implements OnInit {

  ngOnInit() {}
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
