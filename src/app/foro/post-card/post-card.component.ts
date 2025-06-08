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
  @Input() commentText: string = '';
  @Output() commentTextChange = new EventEmitter<string>();
  @Output() addComment = new EventEmitter<string>();

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

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInDays < 7) return `${diffInDays}d`;

    return date.toLocaleDateString();
  }
}
