import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  standalone:false
})
export class ListaComponent implements OnInit {
  @Output() chatSelected = new EventEmitter<number>();  // <-- número, no string
  conversations: any[] = [];
  selectedChatId: number | null = null;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuariosService.getUsuarios_Chats(String(localStorage.getItem('correoGlobal'))).subscribe({
      next: (response) => {
        this.conversations = response.Usuarios_list;
      },
    });
  }

  onChatClick(chatId: number): void {
    this.selectedChatId = chatId;
    this.chatSelected.emit(chatId);  // <-- emitir al padre
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }

}
