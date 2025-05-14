import { FechaNacimientoComponent } from './../../shared/fecha-nacimiento/fecha-nacimiento.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ContrasenaComponent } from 'src/app/shared/contrasena/contrasena.component';
import { CorreoComponent } from 'src/app/shared/correo/correo.component';
import { NombreComponent } from 'src/app/shared/nombre/nombre.component';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  standalone:false,
})
export class PrincipalComponent  implements OnInit {

  @ViewChild(NombreComponent) nombreComp!: NombreComponent;
  @ViewChild(CorreoComponent) correoComponent!: CorreoComponent;
  @ViewChild(FechaNacimientoComponent) fechaNacimientoComp!: FechaNacimientoComponent;
  @ViewChild(ContrasenaComponent) contrasenaComp!: ContrasenaComponent;

  constructor() { }

  ngOnInit() {}
  obtenerDatos(){

    const nombre =this.nombreComp.Nombre;
    const correo = this.correoComponent.Correo;
    const fechaNacimiento = this.fechaNacimientoComp.Fecha_Nacimiento_date;
    const contrasena=this.contrasenaComp.contrasena;

    console.log("la contraseña es",contrasena,nombre);
  }
}
