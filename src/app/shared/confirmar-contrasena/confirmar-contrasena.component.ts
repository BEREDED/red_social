import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmar-contrasena',
  templateUrl: './confirmar-contrasena.component.html',
  styleUrls: ['./confirmar-contrasena.component.scss'],
  standalone:false,
})
export class ConfirmarContrasenaComponent  implements OnInit {
  confirmPassword: string = '';

  @Output() confirmPasswordChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onConfirmPasswordInput() {
    this.confirmPasswordChange.emit(this.confirmPassword);
  }
}
