import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-join-exit',
  templateUrl: './join-exit.component.html',
  styleUrls: ['./join-exit.component.scss'],
  standalone: false,
})
export class JoinExitComponent {
  @Input() communityId: string = '';
  @Input() initialJoinState: boolean = false;

  isJoined: boolean = false;

  ngOnInit() {
    this.isJoined = this.initialJoinState;
  }

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
    // Aquí harías la llamada a tu API para unirse
    // this.communityService.joinCommunity(this.communityId).subscribe(...)
  }

  private leaveCommunity() {
    console.log(`Saliendo de la comunidad: ${this.communityId}`);
    // Aquí harías la llamada a tu API para salir
    // this.communityService.leaveCommunity(this.communityId).subscribe(...)
  }
}
