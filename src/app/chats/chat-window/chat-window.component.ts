import { Component, Input, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Mensajes } from '../../modelos/mensajes.interface';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  standalone: false
})
export class ChatWindowComponent implements OnInit{
  @Input() chatId!: number;
  participantFullName: string = '';
  Mensajes:any[]=[]
  conversations: any[] = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatId'] && !changes['chatId'].firstChange) {
      this.loadChatData(this.chatId);
    }
  }

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;



  isLoading: boolean = true;

  private shouldScrollToBottom = true;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }
private loadChatData(idChat: number): void {
  this.isLoading = true;
  const correoActual = localStorage.getItem('correoGlobal');

  this.usuariosService.getmensajes(idChat).subscribe({
    next: (response) => {
      this.Mensajes = response.Mensajes.map((msg: any) => ({
        ...msg,
        isFromCurrentUser: msg.Correo_emit === correoActual
      }));

      this.isLoading = false;
      console.log('Mensajes cargados:', this.Mensajes);
    },
    error: () => {
      this.isLoading = false;
      console.error('Error al cargar mensajes.');
    }
  });
}

    getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }


  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
    }
  }


hasMessages() {
  }
  private cargarConversaciones(): void {
    const correo = localStorage.getItem('correoGlobal');
    if (!correo) return;

    this.usuariosService.getUsuarios_Chats(correo).subscribe({
      next: (response) => {
        this.conversations = response.Usuarios_list;

        const chat = this.conversations.find(conv => conv.Id_Chat === this.chatId);
        if (chat) {
          this.participantFullName = `${chat.Nombre} ${chat.Apellido_Pat}`;
        } else {
          this.participantFullName = 'Desconocido';
        }

        console.log("Nombre del participante:", this.participantFullName);
      },
      error: (err) => {
        console.error('Error al cargar conversaciones:', err);
      }
    });
  }
}
