import { Component, OnInit, ViewChild } from '@angular/core';

import { ContrasenaComponent } from 'src/app/shared/contrasena/contrasena.component';
import { UserDataService } from 'src/app/services/user-data.service';

import { Usuario_ini } from 'src/app/modelos/Usuario_ini';

@Component({
  selector: 'app-componente-prin',
  templateUrl: './componente-prin.component.html',
  styleUrls: ['./componente-prin.component.scss'],
  standalone:false
})
export class ComponentePrinComponent  implements OnInit {
  @ViewChild(ContrasenaComponent) contrasenaComp!: ContrasenaComponent;
  email: string = '';

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {}

  onCorreoChange(newCorreo: string) {
    this.email = newCorreo;
    this.userDataService.setEmail(this.email);
  }

  obtenerDatos(){
    const contrasena=this.contrasenaComp.contrasena;
    console.log("la contraseña es",contrasena);
    console.log("el correo es", this.email);
  }
}
