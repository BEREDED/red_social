import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.scss'],
  standalone:false
})
export class NombreComponent  implements OnInit {
  @Input() nombre: string = '';
  @Input() apellidoPat: string = '';
  @Input() apellidoMat: string = '';

  Nombre:string='';
  constructor() { }

  ngOnInit() {}
}
