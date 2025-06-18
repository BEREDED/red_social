import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-boton-tgf',
  templateUrl: './boton-tgf.component.html',
  styleUrls: ['./boton-tgf.component.scss'],
  standalone: false
})
export class BotonTgfComponent {
  @Output() filtroSeleccionado = new EventEmitter<string>();

  seleccionarFiltro(tipo: string) {
    this.filtroSeleccionado.emit(tipo); // Emite 'todo', 'grupo' o 'foro'
  }
}
