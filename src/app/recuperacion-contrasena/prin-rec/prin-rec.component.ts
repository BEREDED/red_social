import { Component, OnInit, viewChild, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { response, Response } from 'express';
import { nextTick } from 'process';
import { Usuario_rec } from 'src/app/modelos/usuario_rec';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ContrasenaComponent } from 'src/app/shared/contrasena/contrasena.component';
import { CorreoComponent } from 'src/app/shared/correo/correo.component';
import { FechaNacimientoComponent } from 'src/app/shared/fecha-nacimiento/fecha-nacimiento.component';


@Component({
  selector: 'app-prin-rec',
  templateUrl: './prin-rec.component.html',
  styleUrls: ['./prin-rec.component.scss'],
  standalone:false
})
export class PrinRecComponent  implements OnInit {
  usuario_rec:Usuario_rec = {
    Correo:'',
    Contraseña:''
  }

  showPopup: boolean = false;

  @ViewChild(CorreoComponent) correoComp!:CorreoComponent
  @ViewChild(FechaNacimientoComponent) fechaComp!:FechaNacimientoComponent
  @ViewChild(ContrasenaComponent) contraComp !:ContrasenaComponent
  constructor(private userDataService: UsuariosService, private router: Router) { }

  ngOnInit() {}

  get isCorreoEmpty(): boolean {
    return !this.correoComp || !this.correoComp.Correo || this.correoComp.Correo.trim() === '' || !this.correoComp.isValidCorreo;
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  confirmPassword() {
    this.Actualizarcontr();
    this.closePopup();
  }

  Actualizarcontr(){
    this.usuario_rec.Correo= this.correoComp.Correo;
    this.usuario_rec.Contraseña= this.contraComp.contrasena;
    this.userDataService.postNuevaContr(this.usuario_rec).subscribe({
      next:(response) => {
        if(response.cambio_contr){
          console.log("el cambio de contrsaeña fue exitoso");
          this.router.navigate(['/inicio_sesion'])
        }else{
          console.log("el cambio de contraseña no fue exitoso");
        }
      }
    })
    };
  }
