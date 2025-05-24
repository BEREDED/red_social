import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss'],
  standalone: false
})
export class ChatItemComponent {
  @Input() chatId!: string;
  @Input() participantName!: string;
  @Input() participantAvatar?: string;
  @Input() lastMessage?: string;
  @Input() lastMessageTime?: Date;
  @Input() unreadCount: number = 0;
  @Input() isOnline: boolean = false;
  @Input() isSelected: boolean = false;

  @Output() chatClicked = new EventEmitter<string>();

  onChatClick() {
    this.chatClicked.emit(this.chatId);
  }

  getTimeDisplay(): string {
    if (!this.lastMessageTime) return '';

    const now = new Date();
    const messageDate = new Date(this.lastMessageTime);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return minutes < 1 ? 'Ahora' : `${minutes}m`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return messageDate.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit'
      });
    }
  }

  getInitials(): string {
    if (!this.participantName) return '?';
    return this.participantName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
