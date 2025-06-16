import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
    Contraseña:'',
    Fch_Nacimiento:''
  }

  showPopup: boolean = false;
  correoValido: boolean = true;
  errorMessage: string = '';


  @ViewChild(CorreoComponent) correoComp!:CorreoComponent
  @ViewChild(FechaNacimientoComponent) fechaComp!:FechaNacimientoComponent
  @ViewChild(ContrasenaComponent) contraComp !:ContrasenaComponent
  constructor(private userDataService: UsuariosService, private router: Router) { }

  ngOnInit() {}

  get isCorreoEmpty(): boolean {
    return !this.correoComp || !this.correoComp.Correo || this.correoComp.Correo.trim() === '' || !this.correoComp.isValidCorreo;
  }


  get formularioValido(): boolean {
  return (
    !!this.correoComp?.Correo &&
    !!this.fechaComp?.Fecha_Nacimiento_string &&
    this.correoValido
  );
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

  Actualizarcontr() {
    this.usuario_rec.Correo = this.correoComp.Correo;
    this.usuario_rec.Contraseña = this.contraComp.contrasena;
    this.fechaComp.actualizarFecha();
    const fecha = this.fechaComp.Fecha_Nacimiento_date;
    const yyyy = fecha.getFullYear();
    const mm = String(fecha.getMonth() + 1).padStart(2, '0');
    const dd = String(fecha.getDate()).padStart(2, '0');
    this.usuario_rec.Fch_Nacimiento = `${yyyy}-${mm}-${dd}`;
    console.log("esto es la fecha que se envia" + this.usuario_rec.Fch_Nacimiento);
    this.userDataService.postNuevaContr(this.usuario_rec).subscribe({
      next: (response) => {
        if (response.cambio_contr=true) {
          console.log("El cambio de contraseña fue exitoso");
          this.router.navigate(['/inicio_sesion']);
        } else {
          console.log("El cambio de contraseña no fue exitoso");
        }
      },
      error: (err) => {
        console.log("Error en la solicitud:", err);
      }
    });
  }
}
