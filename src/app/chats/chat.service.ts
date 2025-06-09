import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Models
export interface User {
  id: string;
  name: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isFromCurrentUser: boolean;
}

export interface ChatConversation {
  id: string;
  participant: User;
  messages: ChatMessage[];
  lastMessage?: ChatMessage;
  unreadCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private currentUserId: string = '';
  private conversationsSubject = new BehaviorSubject<ChatConversation[]>([]);
  private selectedChatSubject = new BehaviorSubject<string | null>(null);

  constructor() { }

  // Observables públicos
  getConversations(): Observable<ChatConversation[]> {
    return this.conversationsSubject.asObservable();
  }

  getSelectedChat(): Observable<string | null> {
    return this.selectedChatSubject.asObservable();
  }

  // Métodos de configuración
  setCurrentUserId(userId: string): void {
    this.currentUserId = userId;
  }

  getCurrentUserId(): string {
    return this.currentUserId;
  }

  // Métodos para manejar conversaciones
  setConversations(conversations: ChatConversation[]): void {
    this.conversationsSubject.next(conversations);
  }

  updateConversation(conversation: ChatConversation): void {
    const conversations = this.conversationsSubject.value;
    const index = conversations.findIndex(conv => conv.id === conversation.id);

    if (index !== -1) {
      conversations[index] = conversation;
      this.conversationsSubject.next([...conversations]);
    } else {
      conversations.push(conversation);
      this.conversationsSubject.next([...conversations]);
    }
  }

  // Métodos para manejar chat seleccionado
  selectChat(chatId: string): void {
    this.selectedChatSubject.next(chatId);
    this.markMessagesAsRead(chatId);
  }

  getChatById(chatId: string): ChatConversation | undefined {
    const conversations = this.conversationsSubject.value;
    return conversations.find(conv => conv.id === chatId);
  }

  // Métodos para manejar mensajes
  sendMessage(chatId: string, content: string): void {
    const conversations = this.conversationsSubject.value;
    const chatIndex = conversations.findIndex(conv => conv.id === chatId);

    if (chatIndex !== -1 && this.currentUserId) {
      const newMessage: ChatMessage = {
        id: this.generateMessageId(),
        senderId: this.currentUserId,
        receiverId: conversations[chatIndex].participant.id,
        content: content.trim(),
        timestamp: new Date(),
        isFromCurrentUser: true
      };

      conversations[chatIndex].messages.push(newMessage);
      conversations[chatIndex].lastMessage = newMessage;

      this.conversationsSubject.next([...conversations]);

      // Aquí puedes emitir el evento para enviar el mensaje al servidor
      this.onMessageSent(newMessage, chatId);
    }
  }

  addMessage(chatId: string, message: ChatMessage): void {
    const conversations = this.conversationsSubject.value;
    const chatIndex = conversations.findIndex(conv => conv.id === chatId);

    if (chatIndex !== -1) {
      // Verificar si el mensaje es del usuario actual
      message.isFromCurrentUser = message.senderId === this.currentUserId;

      conversations[chatIndex].messages.push(message);
      conversations[chatIndex].lastMessage = message;

      // Si no es del usuario actual, incrementar contador de no leídos
      if (!message.isFromCurrentUser) {
        conversations[chatIndex].unreadCount++;
      }

      this.conversationsSubject.next([...conversations]);
    }
  }

  markMessagesAsRead(chatId: string): void {
    const conversations = this.conversationsSubject.value;
    const chatIndex = conversations.findIndex(conv => conv.id === chatId);

    if (chatIndex !== -1 && conversations[chatIndex].unreadCount > 0) {
      conversations[chatIndex].unreadCount = 0;
      this.conversationsSubject.next([...conversations]);

      // Aquí puedes emitir el evento para marcar como leído en el servidor
      this.onMessagesMarkedAsRead(chatId);
    }
  }

  // Métodos privados y utilidades
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Hooks para integración con servicios externos
  private onMessageSent(message: ChatMessage, chatId: string): void {
    // Implementar aquí la lógica para enviar el mensaje al servidor
    // Por ejemplo: this.websocketService.sendMessage(message);
    console.log('Message sent:', message, 'in chat:', chatId);
  }

  private onMessagesMarkedAsRead(chatId: string): void {
    // Implementar aquí la lógica para marcar mensajes como leídos en el servidor
    // Por ejemplo: this.apiService.markAsRead(chatId);
    console.log('Messages marked as read for chat:', chatId);
  }

  // Métodos para limpiar datos
  clearConversations(): void {
    this.conversationsSubject.next([]);
  }

  clearSelectedChat(): void {
    this.selectedChatSubject.next(null);
  }
}
