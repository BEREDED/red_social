import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fecha-nacimiento',
  templateUrl: './fecha-nacimiento.component.html',
  styleUrls: ['./fecha-nacimiento.component.scss'],
  standalone:false
})
export class FechaNacimientoComponent  implements OnInit {
  Fecha_Nacimiento_string:string='';
  Fecha_Nacimiento_date:Date=new Date(this.Fecha_Nacimiento_string);
  constructor() { }

  ngOnInit() {}

}
