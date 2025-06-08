// feed.component.ts
import { Component, OnInit, HostListener } from '@angular/core';
import { Post, Comment } from '../../modelos/post.interface';

// Interfaces definidas directamente en el componente

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: false,
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];
  isLoading = false;
  page = 1;
  hasMorePosts = true;

  // Para comentarios
  commentTexts: { [postId: string]: string } = {};

  ngOnInit(): void {
    this.loadInitialPosts();
  }

  loadInitialPosts(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.posts = this.generateMockPosts(10);
      this.isLoading = false;
    }, 500);
  }

  loadMorePosts(): void {
    if (this.isLoading || !this.hasMorePosts) return;

    this.isLoading = true;

    setTimeout(() => {
      const newPosts = this.generateMockPosts(5, this.posts.length);
      this.posts = [...this.posts, ...newPosts];
      this.page++;

      // Simular que no hay más posts después de cargar muchos
      if (this.posts.length > 50) {
        this.hasMorePosts = false;
      }

      this.isLoading = false;
    }, 800);
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    // Cargar más cuando esté cerca del final (100px antes)
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      this.loadMorePosts();
    }
  }

  generateMockPosts(count: number, startIndex: number = 0): Post[] {
    const authors = [
      'María González', 'Carlos Rodríguez', 'Ana Martínez', 'Luis García',
      'Carmen López', 'José Hernández', 'Laura Pérez', 'Miguel Torres',
      'Elena Ruiz', 'David Morales', 'Isabel Jiménez', 'Antonio Muñoz'
    ];

    const contents = [
      '¡Hola a todos! ¿Cómo están pasando su día? Espero que muy bien 😊',
      'Acabo de terminar mi proyecto final. ¡Qué alivio! Ya era hora de descansar un poco.',
      'Compartiendo algunos pensamientos sobre el nuevo curso que empecé. Muy interesante hasta ahora.',
      '¿Alguien más está emocionado por el fin de semana? Ya tengo planes increíbles.',
      'Reflexionando sobre los cambios que he hecho este año. Ha sido todo un viaje.',
      'Buenos días comunidad. Espero que tengan un excelente día lleno de logros.',
      'Pregunta para ustedes: ¿cuál ha sido su mayor aprendizaje este mes?',
      'Compartiendo un momento de gratitud. Agradecido por todas las oportunidades.',
      'Terminé de leer un libro increíble. Las recomendaciones siempre son bienvenidas.',
      '¡Por fin viernes! ¿Qué planes tienen para relajarse?',
      'Motivación del día: cada pequeño paso cuenta hacia nuestros objetivos.',
      'Reflexión matutina: la perseverancia siempre da frutos al final.',
    ];

    return Array.from({ length: count }, (_, i) => {
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      const randomContent = contents[Math.floor(Math.random() * contents.length)];
      const randomDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);

      return {
        id: `post-${startIndex + i + 1}`,
        author: randomAuthor,
        content: randomContent,
        createdAt: randomDate,
        comments: this.generateMockComments(Math.floor(Math.random() * 4)) // 0-3 comentarios
      };
    });
  }

  generateMockComments(count: number): Comment[] {
    const authors = ['Pedro Silva', 'Lucía Moreno', 'Roberto Castro', 'Andrea Vega'];
    const comments = [
      '¡Totalmente de acuerdo!',
      'Muy buen punto, gracias por compartir.',
      'Interesante perspectiva.',
      '¡Excelente! Me gusta tu enfoque.',
      'Gracias por la inspiración.',
      '¡Qué genial! Felicidades.',
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: `comment-${Date.now()}-${i}`,
      author: authors[Math.floor(Math.random() * authors.length)],
      content: comments[Math.floor(Math.random() * comments.length)],
      createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
    }));
  }

  canComment(postId: string): boolean {
    const content = this.commentTexts[postId] || '';
    return content.trim().length > 0 && content.length <= 300;
  }

  onComment(postId: string): void {
    const content = this.commentTexts[postId];
    if (!this.canComment(postId)) return;

    const post = this.posts.find(p => p.id === postId);
    if (post) {
      const newComment: Comment = {
        id: `comment-${Date.now()}`,
        author: 'Tú', // En producción sería el usuario actual
        content: content.trim(),
        createdAt: new Date()
      };

      post.comments.push(newComment);
      this.commentTexts[postId] = '';
    }
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
