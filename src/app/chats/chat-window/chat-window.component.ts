import { Component, Input, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  standalone: false
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  @Input() chatId!: string;
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  // Datos mock para pruebas
  participant = {
    id: '2',
    name: 'Juan Pérez',
    avatar: '',
    isOnline: true
  };

  messages = [
    {
      id: '1',
      senderId: '2',
      receiverId: '1',
      content: 'Hola! ¿Cómo estás?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
      isFromCurrentUser: false
    },
    {
      id: '2',
      senderId: '1',
      receiverId: '2',
      content: '¡Hola! Todo bien por aquí, ¿y tú?',
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 min ago
      isFromCurrentUser: true
    },
    {
      id: '3',
      senderId: '2',
      receiverId: '1',
      content: 'Excelente! Quería preguntarte sobre el proyecto que estamos desarrollando',
      timestamp: new Date(Date.now() - 1000 * 60 * 20), // 20 min ago
      isFromCurrentUser: false
    },
    {
      id: '4',
      senderId: '1',
      receiverId: '2',
      content: 'Claro, dime qué necesitas saber',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
      isFromCurrentUser: true
    },
    {
      id: '5',
      senderId: '2',
      receiverId: '1',
      content: '¿Podemos revisar los componentes de Angular que estamos creando? Tengo algunas dudas sobre la estructura',
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 min ago
      isFromCurrentUser: false
    }
  ];

  newMessage: string = '';
  private shouldScrollToBottom = true;

  constructor() { }

  ngOnInit(): void {
    // Aquí cargarías los mensajes del chat específico
    this.loadChatMessages();
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
    }
  }

  loadChatMessages() {
    // Aquí harías la llamada al servicio para cargar los mensajes
    // Por ahora usamos datos mock
    console.log('Loading messages for chat:', this.chatId);
  }

  onSendMessage() {
    if (this.newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        senderId: '1', // ID del usuario actual
        receiverId: this.participant.id,
        content: this.newMessage.trim(),
        timestamp: new Date(),
        isFromCurrentUser: true
      };

      this.messages.push(message);
      this.newMessage = '';
      this.shouldScrollToBottom = true;

      // Aquí enviarías el mensaje al servicio
      console.log('Sending message:', message);
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSendMessage();
    }
  }

  private scrollToBottom(): void {
    try {
      const container = this.messagesContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
      this.shouldScrollToBottom = false;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  getMessageTime(timestamp: Date): string {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getInitials(): string {
    return this.participant.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
}
