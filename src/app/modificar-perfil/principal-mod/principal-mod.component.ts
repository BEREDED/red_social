import { ContrasenaComponent } from './../../shared/contrasena/contrasena.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Usu_actulizar } from '../../modelos/us_actulizar';
import { NombreComponent } from 'src/app/shared/nombre/nombre.component';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-principal-mod',
  templateUrl: './principal-mod.component.html',
  styleUrls: ['./principal-mod.component.scss'],
  standalone: false
})
export class PrincipalModComponent implements OnInit {
  usu_actulizar: Usu_actulizar = {
    Nombre: '',
    Apellido_pat: '',
    Apellido_mat: '',
    Contraseña: ''
  }
  @ViewChild(ContrasenaComponent)Contracomp!:ContrasenaComponent
  @ViewChild(NombreComponent)Nomcomp!:NombreComponent

  isEditing: boolean = false;
  usuario: any;

  constructor(private _location: Location, private usuarioservice:UsuariosService) { }

  goBack() {
    this._location.back();
  }

  ngOnInit() {
    this.usuarioservice.Postsoldata().subscribe({
      next: (data: any) => {
        this.usuario = data;
      },
      error: (err) => {
        console.error('Error al obtener datos del usuario', err);
      }
    });
  }


  toggleEdit() {
    this.isEditing = !this.isEditing;
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
  acceptEdit() {
    const nameparts=this.extractNameParts(this.Nomcomp.Nombre)
    this.usu_actulizar.Nombre=nameparts.nombre
    this.usu_actulizar.Apellido_pat=nameparts.apellido_pat
    this.usu_actulizar.Apellido_mat=nameparts.apellido_mat
    this.usu_actulizar.Contraseña=this.Contracomp.contrasena
    this.isEditing = false;
    this.usuarioservice.postActualizardata(this.usu_actulizar).subscribe({

    })
  }
}
