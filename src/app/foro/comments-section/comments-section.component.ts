// comments-section.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../../modelos/post.interface';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss'],
  standalone: false
})
export class CommentsSectionComponent {
  @Input() comments: Comment[] = [];
  @Input() postId: string = '';
  @Input() commentText: string = '';
  @Output() commentTextChange = new EventEmitter<string>();
  @Output() addComment = new EventEmitter<void>();

  onCommentTextChange(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.commentTextChange.emit(target.value);
  }

  onAddComment(): void {
    this.addComment.emit();
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
