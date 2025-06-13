import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PrincipalModComponent } from 'src/app/modificar-perfil/principal-mod/principal-mod.component';


@Component({
  selector: 'app-fecha-nacimiento',
  templateUrl: './fecha-nacimiento.component.html',
  styleUrls: ['./fecha-nacimiento.component.scss'],
  standalone: false,
  template:`<input type="text" [(ngModel)]="Fecha_Nacimiento_string" />`,
})
export class FechaNacimientoComponent implements OnInit {
  @ViewChild(PrincipalModComponent)prinmod!:PrincipalModComponent
  @Input() Fecha_Nacimiento_string: string = '';
  Fecha_Nacimiento_date: Date = new Date();

  constructor() {}

  ngOnInit() {}

  actualizarFecha() {
    if (this.Fecha_Nacimiento_string) {
      const parts = this.Fecha_Nacimiento_string.split('-');
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // monthIndex starts at 0
      const day = parseInt(parts[2], 10);
      this.Fecha_Nacimiento_date = new Date(year, month, day);
    } else {
      this.Fecha_Nacimiento_date = new Date();
    }
  }
}
