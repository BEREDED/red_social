import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-fecha-nacimiento',
  templateUrl: './fecha-nacimiento.component.html',
  styleUrls: ['./fecha-nacimiento.component.scss'],
  standalone: false
})
export class FechaNacimientoComponent implements OnInit {
  Fecha_Nacimiento_string: string = '';
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
