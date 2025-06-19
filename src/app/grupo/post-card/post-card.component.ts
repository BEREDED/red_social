// post-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../modelos/post.interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  standalone: false
})
export class PostCardComponent {
  @Input() post!: Post;
  @Input() is_creador:boolean=false;
  @Input() commentText: string = '';
  @Output() commentTextChange = new EventEmitter<string>();
  @Output() addComment = new EventEmitter<string>();
  @Input() idPost!: number;

  onCommentTextChange(value: string): void {
    this.commentTextChange.emit(value);
  }

  onAddComment(): void {
    if (this.canComment()) {
      this.addComment.emit(this.commentText);
    }
  }

  canComment(): boolean {
    return this.commentText.trim().length > 0 && this.commentText.length <= 300;
  }

  getTimeAgo(fecha: string | Date): string {
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
}
