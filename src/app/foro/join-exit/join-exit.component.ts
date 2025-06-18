import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-join-exit',
  templateUrl: './join-exit.component.html',
  styleUrls: ['./join-exit.component.scss'],
  standalone: false,
})
export class JoinExitComponent {
  @Input() communityId: string = '';
  @Output() onExitRequest = new EventEmitter<void>(); // Nuevo evento

  private _isinscrito: boolean = false;

  @Input()
  set isinscrito(value: boolean) {
    this._isinscrito = value;
    this.isJoined = value; // se actualiza el estado visible
  }

  get isinscrito(): boolean {
    return this._isinscrito;
  }

  isJoined: boolean = false;

  constructor(private usuariosService: UsuariosService) {}

  toggleJoin() {
    if (this.isJoined) {
      // En lugar de salir directamente, emitir evento para mostrar confirmación
      this.onExitRequest.emit();
    } else {
      // Unirse directamente (sin confirmación)
      this.joinCommunity();
    }
  }

  // Método público para ser llamado después de la confirmación
  public confirmExit() {
    this.isJoined = false;
    this.leaveCommunity();
  }

  private joinCommunity() {
    this.isJoined = true;
    console.log(`Uniéndose a la comunidad: ${this.communityId}`);
    const Fecha_Union = new Date().toISOString().split('T')[0];
    this.usuariosService.postInscribirForo(
      this.communityId,
      String(localStorage.getItem('correoGlobal')),
      Fecha_Union
    ).subscribe({
      next: (response) => {
        console.log(response.Mensaje);
      },
      error: (error) => {
        console.log(error);
        // Revertir estado en caso de error
        this.isJoined = false;
      }
    });
  }

  private leaveCommunity() {
    console.log(`Saliendo de la comunidad: ${this.communityId}`);
    this.usuariosService.postDesinscribirForo(this.communityId, String(localStorage.getItem('correoGlobal'))).subscribe({
      next: (response) => {
        console.log(response.Mensaje);
      },
      error: (error) => {
        console.log(error);
        // Revertir estado en caso de error
        this.isJoined = true;
      }
    });
  }
}
