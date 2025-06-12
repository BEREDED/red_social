import { Component, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  standalone: false,
})
export class SidePanelComponent {
  constructor(private _location: Location) {}

  goBack(){
    this._location.back();
  }
  @Output() chatSeleccionado = new EventEmitter<number>();

  onChatSelected(chatId: number): void {
    this.chatSeleccionado.emit(chatId);
  }

}
