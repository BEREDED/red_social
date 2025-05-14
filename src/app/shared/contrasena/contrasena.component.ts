import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contrasena',
  templateUrl: './contrasena.component.html',
  styleUrls: ['./contrasena.component.scss'],
  standalone:false,
})
export class ContrasenaComponent  implements OnInit {
  contrasena: string = '';

  constructor() { }

  ngOnInit() {}

}
