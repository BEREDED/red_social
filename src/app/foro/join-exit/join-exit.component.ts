import { Component, Input } from '@angular/core';

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
    this.isJoined = value;
  }
  get isinscrito(): boolean {
    return this._isinscrito;
  }

  isJoined: boolean = false;

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
    // Lógica para unirse
  }

  private leaveCommunity() {
    console.log(`Saliendo de la comunidad: ${this.communityId}`);
    // Lógica para salir
  }
}
