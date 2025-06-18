import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss'],
  standalone: false
})
export class ConfirmationPopupComponent {
  @Input() isVisible: boolean = false;
  @Input() title: string = 'Confirmar acción';
  @Input() message: string = '¿Deseas realmente salir?';
  @Input() confirmText: string = 'Sí, salir';
  @Input() cancelText: string = 'Cancelar';

  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  confirm() {
    this.onConfirm.emit();
  }

  cancel() {
    this.onCancel.emit();
  }

  // Cerrar popup al hacer clic en el overlay
  closeOnOverlay(event: Event) {
    if (event.target === event.currentTarget) {
      this.cancel();
    }
  }
}
