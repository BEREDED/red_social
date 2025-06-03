import { Component, OnInit, ViewChild } from '@angular/core';

import { ContrasenaComponent } from 'src/app/shared/contrasena/contrasena.component';
import { UserDataService } from 'src/app/services/user-data.service';

import { Usuario_ini } from 'src/app/modelos/Usuario_ini';
import { CorreoComponent } from 'src/app/shared/correo/correo.component';

@Component({
  selector: 'app-componente-prin',
  templateUrl: './componente-prin.component.html',
  styleUrls: ['./componente-prin.component.scss'],
  standalone:false
})
export class ComponentePrinComponent  implements OnInit {
  usu_ini:Usuario_ini={
    Correo:'',
    Contraseña:''
  }
  @ViewChild(ContrasenaComponent) contrasenaComp!: ContrasenaComponent;
  @ViewChild(CorreoComponent) correoComp!: CorreoComponent;

  constructor() { }

  ngOnInit() {}

  revisardatosdb(){
    this.usu_ini.Correo= this.correoComp;
    this.usu_ini.Contraseña= this.contrasenaComp;
    //this.userDataService.getUsuario().subscribe(data =>
  }
}
