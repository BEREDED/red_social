import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
  standalone:false
})
export class ListaComponent implements OnInit {
  @Output() chatSelected = new EventEmitter<number>();
  @Output() NombreUs= new EventEmitter<string>();
  conversations: any[] = [];
  selectedChatId: number | null = null;
  selectedName: string|null=null;

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.usuariosService.getUsuarios_Chats(String(localStorage.getItem('correoGlobal'))).subscribe({
      next: (response) => {
        this.conversations = response.Usuarios_list;
        console.log(this.conversations)
        const nambe_header=(this.conversations + ' ' + this.conversations)
        console.log(this.conversations)
      },
    });
  }

  onChatClick(chatId: number, nombre:string, apellido:string): void {
    this.selectedChatId = chatId;
    this.chatSelected.emit(chatId);
    this.selectedName =nombre +' ' + apellido // <-- emitir al padre
    this.NombreUs.emit(this.selectedName)
    console.log(this.selectedName)
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }

}
