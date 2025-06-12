import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ChatService, ChatConversation } from '../chat.service';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  standalone: false,
})
export class ListaComponent implements OnInit {
  //llamado de ids tanto de log como con quien hablar
  //id tanto usuario envio y el usuario de recibo
  @Output() chatSelected = new EventEmitter<string>();
  //variable que nos diga elchat
  conversations: any[] = [];
  selectedChatId: string | null = null;

  constructor( private usuarioservice: UsuariosService) { }

  ngOnInit(): void {
    this.loadConversations();
    this.subscribeToSelectedChat();
  }

  private loadConversations(): void {
    this.usuarioservice.getUsuarios_Chats(String(localStorage.getItem('correoGlobal'))).subscribe({
      next: (response) =>{
        this.conversations=response.Usuarios_list
        console.log(this.conversations)
      }
    })
  }

  private subscribeToSelectedChat(): void {
  }

  onChatClick(chatId: string): void {
    console.log(this.conversations)
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
