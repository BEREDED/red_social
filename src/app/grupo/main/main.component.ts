import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone:false
})
export class MainComponent  implements OnInit {

  Titulo_grupo: string = '';
  description:string='';
  isinscrito:boolean=true;

  constructor(private route: ActivatedRoute,private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.Titulo_grupo = this.route.snapshot.paramMap.get('titulo') || '';
    console.log("Foro recibido:", this.Titulo_grupo);
    this.ConseguirData(this.Titulo_grupo )
    this.isUsersuscribed(this.Titulo_grupo,String(localStorage.getItem("correoGlobal")))
  }
  public isUsersuscribed(Titulo_grupo: string, correo: string) {
  this.usuariosService.postissuscribed(Titulo_grupo, correo).subscribe({
    next: (response) => {
      console.log('✅ Usuario suscrito:', response);
      this.isinscrito = true;
    },
    error: (error) => {
      console.warn('⚠️ Usuario NO suscrito');
      this.isinscrito = false;
    }
  });
}

  public ConseguirData(Titulo_grupo: string) {
  this.usuariosService.getInfoForo(Titulo_grupo).subscribe({
    next: (response) => {
      this.description = response.Descripcion;
      console.log('📘 Descripción:', this.description);
    },
    error: (error) => {
      console.error('❌ Error al obtener descripción:', error);
    }
  });
}

}
