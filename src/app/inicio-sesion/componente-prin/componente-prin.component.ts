import { Component, OnInit, ViewChild } from '@angular/core';

import { ContrasenaComponent } from 'src/app/shared/contrasena/contrasena.component';

@Component({
  selector: 'app-componente-prin',
  templateUrl: './componente-prin.component.html',
  styleUrls: ['./componente-prin.component.scss'],
  standalone:false
})
export class ComponentePrinComponent  implements OnInit {
  @ViewChild(ContrasenaComponent) contrasenaComp!: ContrasenaComponent;
  constructor() { }

  ngOnInit() {}
  obtenerDatos(){
    const contrasena=this.contrasenaComp.contrasena;
    console.log("la contraseña es",contrasena);
  }
}
