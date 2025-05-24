import { Component } from '@angular/core';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
  standalone: false
})
export class MainChatComponent {
  selectedChatId: string | null = null;

  constructor() { }

  onChatSelected(chatId: string) {
    this.selectedChatId = chatId;
  }
}
