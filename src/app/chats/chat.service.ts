// models/chat.models.ts
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
