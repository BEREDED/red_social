import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  standalone: false,
})
export class ChatHeaderComponent {

  @Input() isTyping: boolean = false;
  @Output() menuAction = new EventEmitter<string>();
  @Output() backClicked = new EventEmitter<void>();

  showMenu: boolean = false;

  getInitials() {

  }

  getStatusText() {

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
