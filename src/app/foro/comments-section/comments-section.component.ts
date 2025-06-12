import { Component, Input, OnInit } from '@angular/core';
import { Comentario } from 'src/app/modelos/comentario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss'],
  standalone: false
})
export class CommentsSectionComponent implements OnInit {
  commentText: string = '';
  comments: any[] = [];
  @Input() idPost!: number;

  coment_env: Comentario = {
    Id_Publicacion: 0,
    Correo_creador: '',
    Contenido: '',
    Fecha_Comentario: ''
  };

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.obtenerComentariosPost();
  }

  onCommentTextChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.commentText = target.value;
  }

  onAddComment(): void {
    const fecha = new Date();
    this.coment_env = {
      Id_Publicacion: this.idPost,
      Correo_creador: String(localStorage.getItem('correoGlobal')),
      Contenido: this.commentText,
      Fecha_Comentario: fecha.toISOString().slice(0, 16).replace('T', ' ')
    };

    this.usuariosService.crearComentario(this.coment_env).subscribe({
      next: (response) => {
        console.log(response.message);
        this.commentText = '';
        this.obtenerComentariosPost();
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }

  canComment(): boolean {
    return this.commentText.trim().length > 0 && this.commentText.length <= 300;
  }

getTimeAgo(fecha: string): string {
  const date = new Date(fecha);
  if (isNaN(date.getTime())) return 'Fecha inválida';

  const opciones: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return date.toLocaleString('es-MX', opciones).replace(',', '');
}
  obtenerComentariosPost() {
    console.log("id que se manda:", this.idPost);
    this.usuariosService.getComents(this.idPost).subscribe({
      next: (res) => {
        this.comments = res.Coments;
        console.log(this)
        console.log("Comentarios recibidos:", this.comments);
      },
      error: (err) => {
        console.error("Error al obtener comentarios:", err);
      }
    });
  }
}
