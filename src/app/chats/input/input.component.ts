import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false,
})
export class InputComponent implements OnInit{
  @Input() chatId!: number;
  @Input() disabled: boolean = false;
  @Input() placeholder: string = 'Escribe un mensaje...';
  @Output() messageSent = new EventEmitter<string>();

  @ViewChild('messageInput', { static: true }) messageInput!: ElementRef<HTMLTextAreaElement>;
  @Input()
  message: string = '';
  isTyping: boolean = false;
  constructor(private usuarioservice: UsuariosService) { }
  ngOnInit(): void {
  // Aquí puedes inicializar lo que necesites
  console.log("InputComponent inicializado con chatId:", this.chatId);
  }

  ngOnChanges(): void {
    if (this.chatId) {
    console.log("Id desde el window",this.chatId);
  }
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.message = target.value;

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
     const fecha=new Date()
      const fechaFormateada = fecha.toISOString().slice(0, 16).replace('T', ' ');
      this.usuarioservice.PostNuevoMensaje(
      this.chatId,
      this.message,
      String(localStorage.getItem('correoGlobal')),
      fechaFormateada,).subscribe({
        next: (response) =>{
          console.log(response.Mensaje)
        }
      })
  }

}
