import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
  standalone: false,
})
export class MainChatComponent implements OnInit {
// cambia a number si es un número
  selectedChatId: number | null = null;
  selectedName: string | null =null;

  abrirChat(idChat: number): void {
    this.selectedChatId = idChat;  // <-- se actualiza el chat actual
  }
  constructor(private chatService: ChatService,private route: ActivatedRoute) {}

  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const id = params['chatId'];
    if (id) {
      this.selectedChatId = +id; // convierte a número
    }
  });
}
}
