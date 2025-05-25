import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
  standalone: false,
})
export class MainChatComponent implements OnInit {
  selectedChatId: string | null = null;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.subscribeToSelectedChat();
  }

  private subscribeToSelectedChat(): void {
    this.chatService.getSelectedChat().subscribe(chatId => {
      this.selectedChatId = chatId;
    });
  }

  onChatSelected(chatId: string): void {
    this.selectedChatId = chatId;
    this.chatService.selectChat(chatId);
  }
}
