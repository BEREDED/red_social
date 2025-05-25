import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false,
})
export class InputComponent implements AfterViewInit {
  @Input() disabled: boolean = false;
  @Input() placeholder: string = 'Escribe un mensaje...';
  @Output() messageSent = new EventEmitter<string>();

  @ViewChild('messageInput', { static: true }) messageInput!: ElementRef<HTMLTextAreaElement>;

  message: string = '';
  isTyping: boolean = false;

  ngAfterViewInit(): void {
    this.adjustTextareaHeight();
  }

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.message = target.value;
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
    const trimmedMessage = this.message.trim();
    if (trimmedMessage && !this.disabled) {
      this.messageSent.emit(trimmedMessage);
      this.message = '';
      this.resetTextarea();
      this.isTyping = false;
    }
  }

  private adjustTextareaHeight(): void {
    const textarea = this.messageInput.nativeElement;
    textarea.style.height = 'auto';
    const scrollHeight = Math.min(textarea.scrollHeight, 120); // Máximo 120px
    textarea.style.height = scrollHeight + 'px';
  }

  private resetTextarea(): void {
    const textarea = this.messageInput.nativeElement;
    textarea.style.height = 'auto';
    textarea.focus();
  }

  // Métodos para emojis (opcional)
  addEmoji(emoji: string): void {
    this.message += emoji;
    this.adjustTextareaHeight();
    this.messageInput.nativeElement.focus();
  }
}
