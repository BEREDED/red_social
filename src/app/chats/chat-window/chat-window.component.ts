import { Component, Input, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService, ChatConversation, ChatMessage, User } from '../chat.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  standalone: false
})
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() chatId!: string;
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  participant: User | null = null;
  messages: ChatMessage[] = [];
  newMessage: string = '';
  isLoading: boolean = true;

  private shouldScrollToBottom = true;
  private subscriptions: Subscription[] = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    if (this.chatId) {
      this.loadChatData();
      this.subscribeToConversationUpdates();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
    }
  }

  private loadChatData(): void {
    this.isLoading = true;

    const conversation = this.chatService.getChatById(this.chatId);
    if (conversation) {
      this.participant = conversation.participant;
      this.messages = conversation.messages;
      this.isLoading = false;
      this.shouldScrollToBottom = true;
    }
  }

  private subscribeToConversationUpdates(): void {
    const conversationSub = this.chatService.getConversations().subscribe(conversations => {
      const currentConversation = conversations.find(conv => conv.id === this.chatId);
      if (currentConversation) {
        const previousMessageCount = this.messages.length;
        this.messages = currentConversation.messages;

        // Solo hacer scroll si hay nuevos mensajes
        if (this.messages.length > previousMessageCount) {
          this.shouldScrollToBottom = true;
        }
      }
    });

    this.subscriptions.push(conversationSub);
  }

  onSendMessage(): void {
    if (this.newMessage.trim() && this.chatId) {
      this.chatService.sendMessage(this.chatId, this.newMessage.trim());
      this.newMessage = '';
      this.shouldScrollToBottom = true;
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSendMessage();
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer?.nativeElement) {
        const container = this.messagesContainer.nativeElement;
        container.scrollTop = container.scrollHeight;
        this.shouldScrollToBottom = false;
      }
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
    if (!this.participant?.name) return '';

    return this.participant.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  get hasParticipant(): boolean {
    return this.participant !== null && this.participant !== undefined;
  }

  get participantName(): string {
    return this.participant?.name || '';
  }

  get participantAvatar(): string {
    return this.participant?.avatar || '';
  }

  get participantIsOnline(): boolean {
    return this.participant?.isOnline || false;
  }

  get hasMessages(): boolean {
    return this.messages.length > 0;
  }
}
