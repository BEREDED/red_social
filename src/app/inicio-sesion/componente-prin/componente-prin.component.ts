import { Component, OnInit, ViewChild } from '@angular/core';
import { ContrasenaComponent } from 'src/app/shared/contrasena/contrasena.component';

import { Usuario_ini } from 'src/app/modelos/Usuario_ini';
import { CorreoComponent } from 'src/app/shared/correo/correo.component';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';


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

 constructor(private userDataService: UsuariosService, private router: Router) { }

  ngOnInit() {}

 revisardatosdb() {
  console.log("click")
    this.usu_ini.Correo=this.correoComp.Correo;
    this.usu_ini.Contraseña=this.contrasenaComp.contrasena;
    console.log("click")
    this.userDataService.postLogin(this.usu_ini).subscribe({
      next: (response) => {

        if (response.autenticado && response.token) {
          localStorage.clear();
          localStorage.setItem('token', response.token);
          console.log('Sesión iniciada con éxito');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/principal']);});

          localStorage.setItem('correoGlobal', this.correoComp.Correo);
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
