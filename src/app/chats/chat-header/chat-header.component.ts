import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../chat.service';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  standalone: false,
})
export class ChatHeaderComponent {
  @Input() participant!: User;
  @Input() isTyping: boolean = false;
  @Output() menuAction = new EventEmitter<string>();
  @Output() backClicked = new EventEmitter<void>();

  showMenu: boolean = false;

  getInitials(): string {
    if (!this.participant?.name) return '';
    return this.participant.name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  }

  getStatusText(): string {
    if (this.isTyping) return 'Escribiendo...';
    if (this.participant?.isOnline) return 'En línea';
    return 'Desconectado';
  }

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  onMenuItemClick(action: string): void {
    this.menuAction.emit(action);
    this.showMenu = false;
  }

  onBackClick(): void {
    this.backClicked.emit();
  }

  // Cerrar menú al hacer click fuera
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.chat-actions')) {
      this.showMenu = false;
    }
  }
}
