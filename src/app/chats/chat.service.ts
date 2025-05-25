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
  private currentUserId = 'user1'; // Usuario actual
  private conversationsSubject = new BehaviorSubject<ChatConversation[]>([]);
  private selectedChatSubject = new BehaviorSubject<string | null>(null);

  // Mock data
  private mockUsers: User[] = [
    { id: 'user2', name: 'Ana García', avatar: '', isOnline: true },
    { id: 'user3', name: 'Carlos López', avatar: '', isOnline: false },
    { id: 'user4', name: 'María Rodríguez', avatar: '', isOnline: true },
    { id: 'user5', name: 'Juan Pérez', avatar: '', isOnline: false },
    { id: 'user6', name: 'Sofia Martínez', avatar: '', isOnline: true }
  ];

  private mockMessages: ChatMessage[] = [
    {
      id: 'msg1',
      senderId: 'user2',
      receiverId: 'user1',
      content: '¡Hola! ¿Cómo estás?',
      timestamp: new Date(Date.now() - 300000),
      isFromCurrentUser: false
    },
    {
      id: 'msg2',
      senderId: 'user1',
      receiverId: 'user2',
      content: '¡Hola Ana! Todo bien, ¿y tú?',
      timestamp: new Date(Date.now() - 240000),
      isFromCurrentUser: true
    },
    {
      id: 'msg3',
      senderId: 'user2',
      receiverId: 'user1',
      content: 'Muy bien también. ¿Nos vemos mañana para el proyecto?',
      timestamp: new Date(Date.now() - 180000),
      isFromCurrentUser: false
    },
    {
      id: 'msg4',
      senderId: 'user3',
      receiverId: 'user1',
      content: 'Hey, ¿tienes un momento para revisar el código?',
      timestamp: new Date(Date.now() - 120000),
      isFromCurrentUser: false
    },
    {
      id: 'msg5',
      senderId: 'user4',
      receiverId: 'user1',
      content: '¡Perfecto! Nos vemos en la reunión',
      timestamp: new Date(Date.now() - 60000),
      isFromCurrentUser: false
    }
  ];

  constructor() {
    this.initializeConversations();
  }

  private initializeConversations(): void {
    const conversations: ChatConversation[] = this.mockUsers.map(user => {
      const userMessages = this.mockMessages.filter(
        msg => msg.senderId === user.id || msg.receiverId === user.id
      );

      const lastMessage = userMessages.length > 0
        ? userMessages[userMessages.length - 1]
        : undefined;

      const unreadCount = userMessages.filter(
        msg => msg.senderId === user.id && !msg.isFromCurrentUser
      ).length;

      return {
        id: `chat_${user.id}`,
        participant: user,
        messages: userMessages,
        lastMessage,
        unreadCount
      };
    });

    this.conversationsSubject.next(conversations);
  }

  // Observables públicos
  getConversations(): Observable<ChatConversation[]> {
    return this.conversationsSubject.asObservable();
  }

  getSelectedChat(): Observable<string | null> {
    return this.selectedChatSubject.asObservable();
  }

  // Métodos públicos
  selectChat(chatId: string): void {
    this.selectedChatSubject.next(chatId);
    // Marcar mensajes como leídos
    this.markMessagesAsRead(chatId);
  }

  getChatById(chatId: string): ChatConversation | undefined {
    const conversations = this.conversationsSubject.value;
    return conversations.find(conv => conv.id === chatId);
  }

  sendMessage(chatId: string, content: string): void {
    const conversations = this.conversationsSubject.value;
    const chatIndex = conversations.findIndex(conv => conv.id === chatId);

    if (chatIndex !== -1) {
      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        senderId: this.currentUserId,
        receiverId: conversations[chatIndex].participant.id,
        content: content.trim(),
        timestamp: new Date(),
        isFromCurrentUser: true
      };

      conversations[chatIndex].messages.push(newMessage);
      conversations[chatIndex].lastMessage = newMessage;

      this.conversationsSubject.next([...conversations]);
    }
  }

  private markMessagesAsRead(chatId: string): void {
    const conversations = this.conversationsSubject.value;
    const chatIndex = conversations.findIndex(conv => conv.id === chatId);

    if (chatIndex !== -1) {
      conversations[chatIndex].unreadCount = 0;
      this.conversationsSubject.next([...conversations]);
    }
  }

  getCurrentUserId(): string {
    return this.currentUserId;
  }
}
