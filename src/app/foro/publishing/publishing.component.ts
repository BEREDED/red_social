import { Component, Input} from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Post } from 'src/app/modelos/post.interface';

@Component({
  selector: 'app-publishing',
  templateUrl: './publishing.component.html',
  styleUrls: ['./publishing.component.scss'],
  standalone: false,
})
export class PublishingComponent {
  @Input() Titulo_foro: string = '';
  postContent=''
  postcreate:Post={
    Titulo_foro:'',
    correo_Usuario:'',
    Contenido:'',
    Fecha_Publicacion:new Date(),
    Usuario_creador: ''
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
      const fecha=new Date()
      const fechaFormateada = fecha.toISOString().slice(0, 16).replace('T', ' ');
      this.postcreate.Contenido=this.postContent
      this.postcreate.correo_Usuario=String(localStorage.getItem('correoGlobal'))
      this.postcreate.Titulo_foro=this.Titulo_foro
      this.postcreate.Fecha_Publicacion=new Date(fechaFormateada)
      this.usuariosService.postCrearPost(this.postcreate).subscribe({
        next: (response) =>{
          console.log(response.Mensaje)
        },
        error: (error) =>{
          console.error(error)
        }
      })
      console.log("esto es el post", this.postcreate)
      console.log('Publicando:', this.postContent);
      this.postContent=''
    }
  }
}
