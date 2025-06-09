// feed.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post, Comment } from '../../modelos/post.interface';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: false,
})
export class FeedComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  page = 1;
  hasMorePosts = true;

  // Para comentarios
  commentTexts: { [postId: string]: string } = {};

  // Para manejar subscripciones
  private subscriptions: Subscription[] = [];

  constructor(
    // Inyectar aquí los servicios necesarios
    // private postService: PostService,
    // private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadInitialPosts();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadInitialPosts(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.page = 1;

    // Implementar aquí la llamada al servicio
    // this.postService.getPosts(this.page).subscribe({
    //   next: (response) => {
    //     this.posts = response.posts;
    //     this.hasMorePosts = response.hasMore;
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     console.error('Error loading posts:', error);
    //     this.isLoading = false;
    //     this.handleLoadError();
    //   }
    // });

    // Placeholder temporal - remover cuando se implemente el servicio
    console.log('Loading initial posts - implement service call here');
    this.isLoading = false;
  }

  loadMorePosts(): void {
    if (this.isLoading || !this.hasMorePosts) return;

    this.isLoading = true;
    const nextPage = this.page + 1;

    // Implementar aquí la llamada al servicio para más posts
    // this.postService.getPosts(nextPage).subscribe({
    //   next: (response) => {
    //     this.posts = [...this.posts, ...response.posts];
    //     this.page = nextPage;
    //     this.hasMorePosts = response.hasMore;
    //     this.isLoading = false;
    //   },
    //   error: (error) => {
    //     console.error('Error loading more posts:', error);
    //     this.isLoading = false;
    //     this.handleLoadError();
    //   }
    // });

    // Placeholder temporal - remover cuando se implemente el servicio
    console.log(`Loading more posts for page ${nextPage} - implement service call here`);
    this.isLoading = false;
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

  canComment(postId: string): boolean {
    const content = this.commentTexts[postId] || '';
    return content.trim().length > 0 && content.length <= 300;
  }

  onComment(postId: string): void {
    const content = this.commentTexts[postId];
    if (!this.canComment(postId)) return;

    const post = this.posts.find(p => p.id === postId);
    if (!post) return;

    // Implementar aquí la llamada al servicio para agregar comentario
    // this.postService.addComment(postId, content.trim()).subscribe({
    //   next: (newComment) => {
    //     post.comments.push(newComment);
    //     this.commentTexts[postId] = '';
    //   },
    //   error: (error) => {
    //     console.error('Error adding comment:', error);
    //     this.handleCommentError();
    //   }
    // });

    // Placeholder temporal - crear comentario local
    const newComment: Comment = {
      id: `temp-comment-${Date.now()}`,
      author: 'Usuario Actual', // Obtener del servicio de autenticación
      content: content.trim(),
      createdAt: new Date()
    };

    post.comments.push(newComment);
    this.commentTexts[postId] = '';

    console.log('Adding comment - implement service call here:', newComment);
  }

  // Métodos para manejar datos desde servicios externos
  setPosts(posts: Post[]): void {
    this.posts = posts;
  }

  addPosts(posts: Post[]): void {
    this.posts = [...this.posts, ...posts];
  }

  addPost(post: Post): void {
    this.posts.unshift(post); // Agregar al inicio
  }

  updatePost(updatedPost: Post): void {
    const index = this.posts.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
    }
  }

  removePost(postId: string): void {
    this.posts = this.posts.filter(p => p.id !== postId);
  }

  // Métodos de utilidad
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

  // Métodos para manejar errores
  private handleLoadError(): void {
    // Implementar manejo de errores para carga de posts
    // Mostrar toast, mensaje de error, etc.
    console.error('Error loading posts');
  }

  private handleCommentError(): void {
    // Implementar manejo de errores para comentarios
    // Mostrar toast, mensaje de error, etc.
    console.error('Error adding comment');
  }

  // Métodos para refresh y recarga
  refreshFeed(): void {
    this.posts = [];
    this.page = 1;
    this.hasMorePosts = true;
    this.loadInitialPosts();
  }

  // Getters para el template
  get hasPosts(): boolean {
    return this.posts.length > 0;
  }

  get showNoPostsMessage(): boolean {
    return !this.hasPosts && !this.isLoading;
  }
}
