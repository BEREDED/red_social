import { Component, Input, OnInit, OnDestroy, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
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
  Mensajes:any[]=[]
  ngOnChanges(): void {
    if (this.chatId) {
    console.log("Id desde el window",this.chatId);
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

  ngAfterViewChecked(): void {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
    }
  }

  private loadChatData(Id_chat_env:number): void {
    this.isLoading = true;
    console.log(Id_chat_env)
    this.usuariosService.getmensajes(Id_chat_env).subscribe({
      next: (response) =>{
        this.Mensajes=response.Mensajes
        console.log(this.Mensajes)
        this.isLoading = false;
      }
    })}



  onSendMessage(): void {
    //mandar mnesaje?
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSendMessage();
    }
  }

  private scrollToBottom(): void {
  }

  getMessageTime(timestamp: Date) {

  }

  getInitials() {

  }

hasParticipant(){}

 participantName() {

  }

participantAvatar() {
  }

participantIsOnline(){

  }

hasMessages() {
  }
}
