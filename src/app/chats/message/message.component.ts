import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from '../chat.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  standalone: false,
})
export class MessageComponent implements OnInit {
  @Input() message!: ChatMessage;
  @Input() showAvatar: boolean = true;
  @Input() senderName?: string;
  @Input() senderAvatar?: string;

  showTime: boolean = false;

  ngOnInit(): void {
    // Validar que el mensaje existe
    if (!this.message) {
      console.error('Message component requires a message input');
    }
  }

  toggleTimeDisplay(): void {
    this.showTime = !this.showTime;
  }

  getTimeString(): string {
    if (!this.message?.timestamp) return '';

    const messageDate = new Date(this.message.timestamp);
    const now = new Date();
    const isToday = messageDate.toDateString() === now.toDateString();

    if (isToday) {
      return messageDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      return messageDate.toLocaleDateString() + ' ' +
             messageDate.toLocaleTimeString([], {
               hour: '2-digit',
               minute: '2-digit'
             });
    }
  }

  getInitials(): string {
    if (!this.senderName) return '';
    return this.senderName
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }

  isLongMessage(): boolean {
    return this.message?.content.length > 100;
  }

  hasLineBreaks(): boolean {
    return this.message?.content.includes('\n');
  }

  // Método para procesar el contenido del mensaje (opcional)
  getProcessedContent(): string {
    if (!this.message?.content) return '';

    // Aquí podrías agregar lógica para:
    // - Convertir URLs en links
    // - Procesar emojis
    // - Formatear texto especial

    return this.message.content;
  }
}
