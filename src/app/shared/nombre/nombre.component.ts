import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.scss'],
  standalone:false
})
export class NombreComponent  implements OnInit {
  Nombre:string='';
  constructor() { }

  ngOnInit() {}
}
