import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { PrincipalModComponent } from 'src/app/modificar-perfil/principal-mod/principal-mod.component';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.scss'],
  standalone:false,
  template: `<input type="text" [(ngModel)]="Correo" />`,
})
export class CorreoComponent  implements OnInit {
  @Input() Correo: string = '';

  isValidCorreo: boolean = true;
  @ViewChild(PrincipalModComponent)prinmod!:PrincipalModComponent
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
