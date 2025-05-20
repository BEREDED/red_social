import { Component, OnInit, Output, EventEmitter, output } from '@angular/core';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.scss'],
  standalone:false,
})
export class CorreoComponent  implements OnInit {
  Correo: string = '';
  isValidCorreo: boolean = true;

  @Output() correoChange = new EventEmitter<string>();
  @Output() correoValid = new EventEmitter<boolean>();
  @Output() correoVacio = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {}



  onCorreoInput() {
    this.validateCorreo();
    this.correoChange.emit(this.Correo);
    this.correoValid.emit(this.isValidCorreo);
  }

  validateCorreo() {
    const pattern = /@ipn\.mx$|@alumno\.ipn\.mx$/;
    this.isValidCorreo = pattern.test(this.Correo);
  }
}
