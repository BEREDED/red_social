import { IfStmt } from '@angular/compiler';
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
  Codigo_grupo: string='';
  correo_creador_comp:string='';
  isinscrito:boolean=true;
  is_creador:boolean=false;
  constructor(private route: ActivatedRoute,private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.Titulo_grupo = this.route.snapshot.paramMap.get('titulo') || '';
    console.log("Foro recibido:", this.Titulo_grupo);
    this.ConseguirData(this.Titulo_grupo )
    this.isUsersuscribed(this.Titulo_grupo,String(localStorage.getItem("correoGlobal")))
  }
  public isUsersuscribed(Titulo_grupo: string, correo: string) {
  this.usuariosService.postissuscribedgpr(Titulo_grupo, correo).subscribe({
    next: (response) => {
      console.log('✅ Usuario suscrito:', response.issus);
      this.isinscrito = true;
    },
    error: (error) => {
      console.warn('⚠️ Usuario NO suscrito');
      this.isinscrito = false;
    }
  });
}

  public ConseguirData(Titulo_grupo: string) {
  console.log(Titulo_grupo)
  this.usuariosService.getInfogrp(Titulo_grupo).subscribe({
    next: (response) => {
      this.Codigo_grupo = response.Clave_Grupo;
      this.correo_creador_comp=response.Correo_Creador;
      console.log(this.Codigo_grupo);
      if(this.correo_creador_comp=String(localStorage.getItem('correoGlobal'))){
        this.is_creador=true;
      }
    },
    error: (error) => {
      console.error('❌ Error al obtener descripción:', error);
    }
  });
}

}
