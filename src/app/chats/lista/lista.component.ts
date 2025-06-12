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
    this.chatSelected.emit(chatId)
  }



  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }
}
