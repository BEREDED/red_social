import { Component, Input } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-join-exit',
  templateUrl: './join-exit.component.html',
  styleUrls: ['./join-exit.component.scss'],
  standalone: false,
})
export class JoinExitComponent {
  @Input() communityId: string = '';

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
    this.isJoined = !this.isJoined;

    if (this.isJoined) {
      this.joinCommunity();
    } else {
      this.leaveCommunity();
    }
  }

  private joinCommunity() {
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
      }
      });
  }
}

