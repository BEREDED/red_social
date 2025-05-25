import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  template: `
    <div class="panel-container">
      <div class="panel-header">
        <a routerLink="/principal" class="return">◀ Regresar</a>
        <h1>Mis Chats</h1>
      </div>
      <app-lista (chatSelected)="onChatSelected($event)"></app-lista>
    </div>
  `,
  styleUrls: ['./side-panel.component.scss'],
  standalone: false,
})
export class SidePanelComponent {
  @Output() chatSelected = new EventEmitter<string>();

  onChatSelected(chatId: string): void {
    this.chatSelected.emit(chatId);
  }
}
