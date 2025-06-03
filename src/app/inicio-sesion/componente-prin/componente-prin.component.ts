import { Component, OnInit, ViewChild } from '@angular/core';

import { ContrasenaComponent } from 'src/app/shared/contrasena/contrasena.component';


import { Usuario_ini } from 'src/app/modelos/Usuario_ini';
import { CorreoComponent } from 'src/app/shared/correo/correo.component';
import { UsuariosService } from 'src/app/services/usuarios.service';

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

  constructor(private userDataService:UsuariosService) { }

  ngOnInit() {}

 revisardatosdb() {
  this.usu_ini.Correo = this.correoComp.Correo;
  this.usu_ini.Contraseña = this.contrasenaComp.contrasena;

  this.userDataService.postLogin(this.usu_ini).subscribe({
    next: (response) => {
      if (response.autenticado && response.token) {
        localStorage.setItem('token', response.token); // Guarda el token
        console.log('Sesión iniciada con éxito');
      } else {
        console.log('No se pudo iniciar sesión');
      }
    },
    error: (error) => {
      console.log('Error al iniciar sesión', error);
    }
  });
}


}
