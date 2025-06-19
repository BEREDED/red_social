import { Component, EventEmitter, Input, Output} from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Post } from 'src/app/modelos/post.interface';
import {MatDatepickerModule} from '@angular/material/datepicker';
@Component({
  selector: 'app-publishing',
  templateUrl: './publishing.component.html',
  styleUrls: ['./publishing.component.scss'],
  standalone: false,
})
export class PublishingComponent {
  @Output() nuevoPost = new EventEmitter<void>();
  @Input() is_creador:boolean=false;
  @Input() Titulo_grupo: string = '';
  postContent=''
  Fecha_cad=''
  isTarea=false
  postcreate:Post={
    Titulo_foro:'',
    correo_Usuario:'',
    Contenido:'',
    Fecha_Publicacion:new Date(),
    Usuario_creador: '',
    id_post_out: 0
  }

  constructor( private usuariosService: UsuariosService) { }

  onInputChange(): void {
    // Aquí puedes agregar lógica adicional cuando cambie el texto
  }

  canPost(): boolean {
    return this.postContent.trim().length > 0 && this.postContent.length <= 500;
  }

  isNearLimit(): boolean {
    return this.postContent.length > 500;
  }

  onPost(): void {
    if (this.canPost()) {
      console.log("prueba de si selecciono la casilla",this.isTarea)
      console.log("prueba de fecha de caducacion", this.Fecha_cad)
      if(this.isTarea===false){
        const fecha=new Date()
        const fechaFormateada = fecha.toISOString().slice(0, 16).replace('T', ' ');
        this.postcreate.Contenido=this.postContent
        this.postcreate.correo_Usuario=String(localStorage.getItem('correoGlobal'))
        this.postcreate.Titulo_foro=this.Titulo_grupo
        this.postcreate.Fecha_Publicacion=new Date(fechaFormateada)
        this.usuariosService.postCrearPostgrp(this.postcreate).subscribe({
          next: (response) =>{
            console.log(response.Mensaje)
            this.nuevoPost.emit();
          },
          error: (error) =>{
            console.error(error)
          }
        })
        console.log("esto es el post", this.postcreate)
        console.log('Publicando:', this.postContent);
        this.postContent=''
      }
      else{
        console.log("esto es una publicacion de tarea")
      }
    }
  }
}
