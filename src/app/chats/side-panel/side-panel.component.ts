import { Component, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  standalone: false,
})
export class SidePanelComponent {
  @Output() chatSelected = new EventEmitter<string>();
  constructor(private _location: Location) {}

  goBack(){
    this._location.back();
  }
  
  onChatSelected(chatId: string): void {
    this.chatSelected.emit(chatId);
  }
}
