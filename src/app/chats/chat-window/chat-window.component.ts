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
  isLoading: boolean = false; // Cambiar el estado inicial
  isSendingMessage: boolean = false;
  private shouldScrollToBottom = true;

  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    // Validar chatId antes de cargar
    if (this.chatId && this.chatId > 0) {
      this.initializeChat();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatId'] && !changes['chatId'].firstChange) {
      // Limpiar mensajes anteriores
      this.Mensajes = [];
      this.participantFullName = '';

      // Validar nuevo chatId
      if (this.chatId && this.chatId > 0) {
        this.initializeChat();
      } else {
        // Si no hay chatId válido, resetear estados
        this.isLoading = false;
        this.Mensajes = [];
      }
    }
  }

  ngOnDestroy(): void {
  }

  private initializeChat(): void {
    console.log('Inicializando chat con ID:', this.chatId);
    this.cargarConversaciones();
    this.loadChatData(this.chatId);
  }

  private loadChatData(idChat: number): void {
    // Validar que el ID sea válido
    if (!idChat || idChat <= 0) {
      console.log('ChatId inválido, mostrando estado vacío');
      this.isLoading = false;
      this.Mensajes = [];
      return;
    }

    this.isLoading = true;
    const correoActual = localStorage.getItem('correoGlobal');
    const startTime = Date.now();

    console.log('Cargando datos del chat:', idChat);

    // Timeout para evitar cargas infinitas
    const timeoutId = setTimeout(() => {
      console.warn('Timeout al cargar mensajes del chat:', idChat);
      this.isLoading = false;
      this.Mensajes = [];
    }, 10000); // 10 segundos timeout

    this.usuariosService.getmensajes(idChat).subscribe({
      next: (response) => {
        clearTimeout(timeoutId);
        const loadTime = Date.now() - startTime;
        console.log(`Respuesta del servidor en ${loadTime}ms:`, response);

        // Validar que la respuesta tenga la estructura esperada
        if (response && response.Mensajes && Array.isArray(response.Mensajes)) {
          this.Mensajes = response.Mensajes.map((msg: any) => ({
            ...msg,
            isFromCurrentUser: msg.Correo_emit === correoActual
          }));

          console.log('Mensajes cargados:', this.Mensajes);
          // Scroll al final después de cargar mensajes
          setTimeout(() => this.scrollToBottom(), 50);
        } else {
          // Si no hay mensajes o la respuesta es vacía
          console.log('No hay mensajes en la respuesta');
          this.Mensajes = [];
        }

        this.isLoading = false;
      },
      error: (error) => {
        clearTimeout(timeoutId);
        const loadTime = Date.now() - startTime;
        console.error(`Error al cargar mensajes en ${loadTime}ms:`, error);

        this.isLoading = false;
        this.Mensajes = []; // Limpiar mensajes en caso de error

        // Si es un error 404 o similar, podría ser un chat nuevo sin mensajes
        if (error.status === 404 || error.status === 400) {
          console.log('Chat nuevo o sin mensajes');
        }
      }
    });
  }

  private cargarConversaciones(): void {
    const correo = localStorage.getItem('correoGlobal');
    if (!correo) return;

    // Si ya tenemos las conversaciones cargadas, buscar directamente
    if (this.conversations.length > 0) {
      const chat = this.conversations.find(conv => conv.Id_Chat === this.chatId);
      if (chat) {
        this.participantFullName = `${chat.Nombre} ${chat.Apellido_Pat}`;
        return;
      }
    }

    const startTime = Date.now();
    this.usuariosService.getUsuarios_Chats(correo).subscribe({
      next: (response) => {
        const loadTime = Date.now() - startTime;
        console.log(`Conversaciones cargadas en ${loadTime}ms`);

        if (response && response.Usuarios_list && Array.isArray(response.Usuarios_list)) {
          this.conversations = response.Usuarios_list;

          const chat = this.conversations.find(conv => conv.Id_Chat === this.chatId);
          if (chat) {
            this.participantFullName = `${chat.Nombre} ${chat.Apellido_Pat}`;
          } else {
            this.participantFullName = 'Nuevo Chat';
          }

          console.log("Nombre del participante:", this.participantFullName);
        }
      },
      error: (err) => {
        const loadTime = Date.now() - startTime;
        console.error(`Error al cargar conversaciones en ${loadTime}ms:`, err);
        this.participantFullName = 'Desconocido';
      }
    });
  }

  getInitials(name: string): string {
    if (!name || name.trim() === '') return '??';

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

  hasMessages(): boolean {
    return this.Mensajes && this.Mensajes.length > 0;
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      const element = this.messagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    }
  }

  // Método para manejar el envío de mensajes desde el componente input
  onMessageSent(messageData: any): void {
    console.log('Mensaje recibido en chat-window:', messageData);

    if (this.isSendingMessage) return; // Prevenir envíos múltiples

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

    setTimeout(() => this.scrollToBottom(), 50);

    // El mensaje ya fue enviado por el componente input, solo necesitamos refrescar
    setTimeout(() => {
      this.refreshMessages();
    }, 1000); // Esperar un poco para que el servidor procese
  }

  // Método para refrescar mensajes (puede ser llamado desde el input)
  refreshMessages(): void {
    console.log('Refrescando mensajes para chatId:', this.chatId);

    // Solo refrescar si tenemos un chatId válido
    if (this.chatId && this.chatId > 0) {
      this.loadChatData(this.chatId);
    }

    this.isSendingMessage = false; // Resetear estado de envío
  }
}
