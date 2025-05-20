import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.scss'],
  standalone:false,
})
export class ContrasenaComponent  implements OnInit {
  contrasena: string = '';

  @Output() contrasenaChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  onContrasenaInput() {
    this.contrasenaChange.emit(this.contrasena);
  }
}
