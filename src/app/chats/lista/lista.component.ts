import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatService, ChatConversation } from '../chat.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  standalone: false,
})
export class ListaComponent implements OnInit {
  @Output() chatSelected = new EventEmitter<string>();

  conversations: ChatConversation[] = [];
  selectedChatId: string | null = null;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadConversations();
    this.subscribeToSelectedChat();
  }

  private loadConversations(): void {
    this.chatService.getConversations().subscribe(conversations => {
      this.conversations = conversations.sort((a, b) => {
        if (!a.lastMessage && !b.lastMessage) return 0;
        if (!a.lastMessage) return 1;
        if (!b.lastMessage) return -1;

        return b.lastMessage.timestamp.getTime() - a.lastMessage.timestamp.getTime();
      });
    });
  }

  private subscribeToSelectedChat(): void {
    this.chatService.getSelectedChat().subscribe(chatId => {
      this.selectedChatId = chatId;
    });
  }

  onChatClick(chatId: string): void {
    this.chatService.selectChat(chatId);
    this.chatSelected.emit(chatId);
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'Ahora';
    if (diffMinutes < 60) return `${diffMinutes}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `${diffDays}d`;

    return date.toLocaleDateString();
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }
}
