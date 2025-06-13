import { ContrasenaComponent } from './../../shared/contrasena/contrasena.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Usu_actulizar } from '../../modelos/us_actulizar';
import { NombreComponent } from 'src/app/shared/nombre/nombre.component';

import { UsuariosService } from 'src/app/services/usuarios.service';
import { getdata } from 'src/app/modelos/getdata.interface';
import { CorreoComponent } from 'src/app/shared/correo/correo.component';
import { FechaNacimientoComponent } from 'src/app/shared/fecha-nacimiento/fecha-nacimiento.component';


@Component({
  selector: 'app-principal-mod',
  templateUrl: './principal-mod.component.html',
  styleUrls: ['./principal-mod.component.scss'],
  standalone: false
})
export class PrincipalModComponent implements OnInit {
  usu_actulizar: Usu_actulizar = {
    Correo:'',
    Nombre: '',
    Apellido_pat: '',
    Apellido_mat: '',
    Contraseña: '',
    Fch_Nacimiento:''
  }
  getData:getdata={
    Correo:''
  }
  @ViewChild(NombreComponent) Nomcomp!: NombreComponent;
  @ViewChild(ContrasenaComponent)Contracomp!:ContrasenaComponent;
  @ViewChild(CorreoComponent)Correocomp!: CorreoComponent;
  @ViewChild(FechaNacimientoComponent)FechNac!: FechaNacimientoComponent;

  nombreCompleto: string = '';
  Correo_front:string='';
  fch_nac_front:string =''

  isEditing: boolean = false;
  usuario: any;

  constructor(private _location: Location, private usuarioservice:UsuariosService) { }

  goBack() {
    this._location.back();
  }


  ngOnInit(): void {
    const coerroenstring= String(localStorage.getItem('correoGlobal'))
    this.getData.Correo=coerroenstring
    this.usuarioservice.Postsoldata(this.getData).subscribe({
      next: (res) => {
        console.log(res.Correo,res.fecha_nac,res.namedb)
        this.nombreCompleto = res.namedb;
        this.Correo_front= res.Correo;
        this.fch_nac_front=res.fecha_nac;
        this.Nomcomp.Nombre=this.nombreCompleto;
        this.Correocomp.Correo=this.Correo_front;
        this.FechNac.Fecha_Nacimiento_string=this.fch_nac_front[0-9];
      },
      error: (e) => console.error('Error al obtener nombre:', e),
    });
  }
  cambiartipodate(facha_camb:string){
    const parts = facha_camb.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // monthIndex starts at 0
    const day = parseInt(parts[2], 10);
    return( new Date(year, month, day))

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
    this.usu_actulizar.Correo=String(localStorage.getItem('correoGlobal'))
    this.usu_actulizar.Nombre=nameparts.nombre
    this.usu_actulizar.Apellido_pat=nameparts.apellido_pat
    this.usu_actulizar.Apellido_mat=nameparts.apellido_mat
    this.usu_actulizar.Contraseña=this.Contracomp.contrasena
    console.log(this.usu_actulizar)
    this.isEditing = false;
    this.usuarioservice.postActualizardata(this.usu_actulizar).subscribe({
      next: (Response) =>{
        console.log(Response)
      },
      error: (Error)=>{
        console.log(Error)
      }
    })
  }
}
