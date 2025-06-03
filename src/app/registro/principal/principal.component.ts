import { FechaNacimientoComponent } from './../../shared/fecha-nacimiento/fecha-nacimiento.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ContrasenaComponent } from 'src/app/shared/contrasena/contrasena.component';
import { CorreoComponent } from 'src/app/shared/correo/correo.component';
import { NombreComponent } from 'src/app/shared/nombre/nombre.component';
import { Usuario } from 'src/app/modelos/Usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  standalone:false,
})
export class PrincipalComponent implements OnInit {
  usuario: Usuario = {
    Nombre:'',
    Apellido_pat:'',
    Apellido_mat:'',
    Correo:'',
    Fch_Nacimiento: new Date(),
    Contraseña:'',
    image: undefined
  };

  contrasenaValue: string = '';
  confirmPasswordValue: string = '';
  correoValido: boolean = true;
  errorMessage: string = '';

  constructor(private usuariosService: UsuariosService) { }

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

  private extractNameParts(fullName: string): { nombre: string; apellido_pat: string; apellido_mat: string } {
    const nameParts = fullName.trim().split(' ');
    let nombre = '';
    let apellido_pat = '';
    let apellido_mat = '';

    if (nameParts.length >= 2) {
      apellido_pat = nameParts[nameParts.length - 2];
      apellido_mat = nameParts[nameParts.length - 1];
      nombre = nameParts.slice(0, nameParts.length - 2).join(' ');
    } else {
      nombre = fullName;
    }

    return { nombre, apellido_pat, apellido_mat };
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

    const nameParts = this.extractNameParts(this.nombreComp.Nombre);
    this.usuario.Nombre = nameParts.nombre;
    this.usuario.Apellido_pat = nameParts.apellido_pat;
    this.usuario.Apellido_mat = nameParts.apellido_mat;
    this.usuario.Correo = this.correoComponent.Correo;
    this.usuario.Contraseña = this.contrasenaValue;
    this.fechaNacimientoComp.actualizarFecha();
    this.usuario.Fch_Nacimiento = this.fechaNacimientoComp.Fecha_Nacimiento_date;

    console.log("Datos del usuario:", this.usuario);
    this.usuariosService.postRegistroUsuario(this.usuario).subscribe({
      next: (response) => {
        console.log('Usuario creado exitosamente', response);
      },
      error: (error) => {
        console.error('Error al crear usuario', error);
      }
    });
  }
}
