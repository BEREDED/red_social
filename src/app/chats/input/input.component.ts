import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false,
})
export class InputComponent implements OnInit {
  @Input() chatId!: number;
  @Input() disabled: boolean = false;
  @Input() isDisabled: boolean = false; // Nueva propiedad para prevenir envíos múltiples
  @Input() placeholder: string = 'Escribe un mensaje...';

  // Eventos para comunicarse con el componente padre
  @Output() messageSent = new EventEmitter<any>();
  @Output() refreshMessages = new EventEmitter<void>();

  @ViewChild('messageInput', { static: true }) messageInput!: ElementRef<HTMLTextAreaElement>;

  message: string = '';
  isTyping: boolean = false;
  isSending: boolean = false; // Estado local para controlar el envío

  constructor(private usuarioservice: UsuariosService) { }

  ngOnInit(): void {
    console.log("InputComponent inicializado con chatId:", this.chatId);
  }

  ngOnChanges(): void {
    if (this.chatId) {
      console.log("Id desde el window", this.chatId);
    }
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.message = target.value;

    // Auto-resize del textarea
    this.adjustTextareaHeight();

    // Simular indicador de escritura
    this.isTyping = this.message.trim().length > 0;
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage(): void {
    // Validaciones previas
    if (!this.message.trim() || this.isSending || this.isDisabled) {
      return;
    }

    // Activar estado de envío
    this.isSending = true;

    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().slice(0, 16).replace('T', ' ');
    const correoActual = localStorage.getItem('correoGlobal');

    // Guardar el mensaje antes de limpiarlo
    const messageToSend = this.message.trim();

    console.log('Enviando mensaje:', messageToSend);

    // Preparar datos del mensaje para el componente padre
    const messageData = {
      Id_Chat: this.chatId,
      Contenido: messageToSend,
      Correo_emit: correoActual,
      Fecha_Envio: fechaFormateada,
      Nombre: this.getCurrentUserName()
    };

    // Limpiar el input inmediatamente para mejor UX
    this.message = '';
    this.adjustTextareaHeight();

    // Emitir evento para actualización optimista en el componente padre
    this.messageSent.emit(messageData);

    // Enviar mensaje al servidor
    this.usuarioservice.PostNuevoMensaje(
      this.chatId,
      messageToSend,
      String(correoActual),
      fechaFormateada
    ).subscribe({
      next: (response) => {
        console.log('Mensaje enviado exitosamente:', response.Mensaje);
        this.isSending = false;

        // Emitir evento para refrescar mensajes después de un breve delay
        setTimeout(() => {
          this.refreshMessages.emit();
        }, 500);
      },
      error: (error) => {
        console.error('Error al enviar mensaje:', error);
        this.isSending = false;

        // En caso de error, restaurar el mensaje en el input
        this.message = messageToSend;
        this.adjustTextareaHeight();

        // Mostrar error al usuario
        alert('Error al enviar el mensaje. Inténtalo de nuevo.');
      }
    });
  }

  // Método para ajustar la altura del textarea automáticamente
  private adjustTextareaHeight(): void {
    if (this.messageInput) {
      const textarea = this.messageInput.nativeElement;
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }

  // Método para obtener el nombre del usuario actual
  private getCurrentUserName(): string {
    // Intenta obtener el nombre de diferentes fuentes posibles
    const nombreCompleto = localStorage.getItem('nombreCompleto');
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const nombre = localStorage.getItem('nombre');

    return nombreCompleto || nombreUsuario || nombre || 'Tú';
  }

  // Método para verificar si el botón debe estar deshabilitado
  get isButtonDisabled(): boolean {
    return !this.message.trim() || this.isSending || this.isDisabled;
  }
}
