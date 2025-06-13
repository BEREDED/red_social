import { Component, Input, OnInit, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  standalone: false
})
export class ChatWindowComponent implements OnInit {
  @Input() chatId!: number;
  participantFullName: string = '';
  Mensajes: any[] = []
  conversations: any[] = [];
  isLoading: boolean = true;
  isSendingMessage: boolean = false;
  private shouldScrollToBottom = true;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    if (this.chatId) {
      this.cargarConversaciones();
      this.loadChatData(this.chatId);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatId'] && !changes['chatId'].firstChange) {
      this.cargarConversaciones();
      this.loadChatData(this.chatId);
    }
  }

  ngOnDestroy(): void {
  }

  private loadChatData(idChat: number): void {
    this.isLoading = true;
    const correoActual = localStorage.getItem('correoGlobal');

    console.log('Cargando datos del chat:', idChat);

    this.usuariosService.getmensajes(idChat).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);

        this.Mensajes = response.Mensajes.map((msg: any) => ({
          ...msg,
          isFromCurrentUser: msg.Correo_emit === correoActual
        }));

        this.isLoading = false;
        console.log('Mensajes cargados:', this.Mensajes);

        // Scroll al final después de cargar mensajes
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al cargar mensajes:', error);
      }
    });
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
    return this.Mensajes.length > 0;
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  // Método para formatear la fecha de manera más legible
  formatearFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    const ahora = new Date();
    const diferencia = ahora.getTime() - fechaObj.getTime();
    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));

    if (minutos < 1) return 'Ahora';
    if (minutos < 60) return `${minutos}m`;
    if (horas < 24) return `${horas}h`;
    if (dias < 7) return `${dias}d`;

    return fechaObj.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit'
    });
  }

  // Método para manejar el envío de mensajes desde el componente input
  onMessageSent(messageData: any): void {
    console.log('Mensaje recibido en chat-window:', messageData);

    if (this.isSendingMessage) return; // Prevenir envíos múltiples

    this.isSendingMessage = true;

    // Agregar el mensaje inmediatamente a la vista (optimistic update)
    const correoActual = localStorage.getItem('correoGlobal');
    const tempMessage = {
      ...messageData,
      isFromCurrentUser: messageData.Correo_emit === correoActual,
      Fecha_Envio: new Date().toISOString(),
      Id_Mensaje: Date.now(), // ID temporal
      isPending: true // Marcar como pendiente
    };

    this.Mensajes.push(tempMessage);
    console.log('Mensaje agregado temporalmente:', tempMessage);
    console.log('Lista actual de mensajes:', this.Mensajes);

    setTimeout(() => this.scrollToBottom(), 50);

    // El mensaje ya fue enviado por el componente input, solo necesitamos refrescar
    setTimeout(() => {
      this.refreshMessages();
    }, 1000); // Esperar un poco para que el servidor procese
  }

  // Método para refrescar mensajes (puede ser llamado desde el input)
  refreshMessages(): void {
    console.log('Refrescando mensajes para chatId:', this.chatId);
    this.loadChatData(this.chatId);
    this.isSendingMessage = false; // Resetear estado de envío
  }
}
