import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.scss'],
  standalone:false,
})
export class CorreoComponent  implements OnInit {
  Correo:string='';
  constructor() { }

  ngOnInit() {}

}
