import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-prin-prin',
  templateUrl: './prin-prin.component.html',
  styleUrls: ['./prin-prin.component.scss'],
  standalone:false
})
export class PrinPrinComponent  implements OnInit {

  forosInscritos: any[] = [];
  gruposRegistrados:any[]=[];
  constructor(private usuarioservice: UsuariosService) {}

  ngOnInit(): void {
    this.getForos();
  }


  getForos(): void {
    const correo = localStorage.getItem('correoGlobal');
    if (!correo) return;

    this.usuarioservice.getListadoForos(correo).subscribe({
      next: (response: any) => {
        console.log("Foros recibidos:", response.foros_Inscritos);
        this.forosInscritos = response.foros_Inscritos;
      },
      error: (err) => console.error('Error al obtener foros:', err)
    });
    this.usuarioservice.getListadoGrps(correo).subscribe({
      next: (response: any) => {
        console.log("grupos recibidos:", response.grupos_Inscritos);
        this.gruposRegistrados = response.grupos_Inscritos;
      },
      error: (err) => console.error('Error al obtener foros:', err)
    });
  }
   crearForo() {
    const foroData = {
      Titulo_foro: 'Nuevo foro',
      Descripcion: 'Ejemplo',
      Fecha_creacion: new Date(),
      Correo_creador: localStorage.getItem('correoGlobal')
    };}
}
