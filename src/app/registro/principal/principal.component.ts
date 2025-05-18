
import { todosmodelos } from 'src/app/modelos/modelosinfo.models';
import { FechaNacimientoComponent } from './../../shared/fecha-nacimiento/fecha-nacimiento.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ContrasenaComponent } from 'src/app/shared/contrasena/contrasena.component';
import { CorreoComponent } from 'src/app/shared/correo/correo.component';
import { NombreComponent } from 'src/app/shared/nombre/nombre.component';
import { Usuario } from 'src/app/modelos/Usuario.interface';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  standalone:false,
})
export class PrincipalComponent implements OnInit {
  usuario: Usuario = {
    nombre: '',
    correo: '',
    Fecha:new Date(),
    contraseña: '',
    image: undefined
  };

  constructor() {}

  @ViewChild(NombreComponent) nombreComp!: NombreComponent;
  @ViewChild(CorreoComponent) correoComponent!: CorreoComponent;
  @ViewChild(FechaNacimientoComponent) fechaNacimientoComp!: FechaNacimientoComponent;
  @ViewChild(ContrasenaComponent) contrasenaComp!: ContrasenaComponent;

  ngOnInit() {}

  obtenerDatos() {
    const nombre = this.nombreComp.Nombre;
    const correo = this.correoComponent.Correo;
    const fechaNacimiento = this.fechaNacimientoComp.Fecha_Nacimiento_date;
    const contrasena = this.contrasenaComp.contrasena;


    console.log("Datos del usuario:", this.usuario);
  }
}
