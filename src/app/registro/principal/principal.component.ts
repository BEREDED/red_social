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

  contrasenaValue: string = '';
  confirmPasswordValue: string = '';
  correoValido: boolean = true;
  errorMessage: string = '';

  constructor() {}

  @ViewChild(NombreComponent) nombreComp!: NombreComponent;
  @ViewChild(CorreoComponent) correoComponent!: CorreoComponent;
  @ViewChild(FechaNacimientoComponent) fechaNacimientoComp!: FechaNacimientoComponent;
  @ViewChild(ContrasenaComponent) contrasenaComp!: ContrasenaComponent;

  ngOnInit() {}

  onContrasenaChange(value: string) {
    this.contrasenaValue = value;
  }

  onConfirmPasswordChange(value: string) {
    this.confirmPasswordValue = value;
  }

  onCorreoValidChange(isValid: boolean) {
    this.correoValido = isValid;
  }

  get passwordsMatch(): boolean {
    return this.contrasenaValue === this.confirmPasswordValue;
  }

  obtenerDatos() {
    this.errorMessage = '';

    if (!this.nombreComp.Nombre || !this.correoComponent.Correo || !this.contrasenaValue || !this.fechaNacimientoComp.Fecha_Nacimiento_string) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      console.error(this.errorMessage);
      return;
    }

    if (!this.correoValido) {
      this.errorMessage = 'El correo no es válido.';
      console.error(this.errorMessage);
      return;
    }

    if (!this.passwordsMatch) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      console.error(this.errorMessage);
      return;
    }

    this.usuario.nombre = this.nombreComp.Nombre;
    this.usuario.correo = this.correoComponent.Correo;
    this.usuario.contraseña = this.contrasenaValue;
    this.fechaNacimientoComp.actualizarFecha();
    this.usuario.Fecha = this.fechaNacimientoComp.Fecha_Nacimiento_date;

    console.log("Datos del usuario:", this.usuario);
  }
}
