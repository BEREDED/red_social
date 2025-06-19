import { Component, OnInit, OnDestroy, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../modelos/post.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: false,
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input() Titulo_grupo: string = '';
  @Input() is_creador:boolean=false;
  @Output() idPostSeleccionado = new EventEmitter<number>();

  posts: Post[] = [];
  isLoading = false;
  page = 1;
  hasMorePosts = true;
  commentTexts: { [postId: string]: string } = {};

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.loadInitialPosts();
  }

  ngOnDestroy(): void {}


  loadInitialPosts(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.page = 1;

    this.usuariosService.recuperarPostgrp(this.Titulo_grupo).subscribe({
      next: (response) => {

        console.log("post recibidos:", response.posts);
        this.posts = response.posts.map(post => ({
        Titulo_foro: this.Titulo_grupo,
        correo_Usuario: '',
        Contenido: post.Contenido,
        Fecha_Publicacion: new Date(post.Fecha_Publicacion),
        Usuario_creador: post.Usuario_creador,
        id_post_out: Number(post.Id_Publicacion)
}))
.sort((a, b) => b.Fecha_Publicacion.getTime() - a.Fecha_Publicacion.getTime());

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al obtener posts:', error);
        this.isLoading = false;
      }
    });
  }
  emitirIdPost(id: number): void {
  this.idPostSeleccionado.emit(id);
}
  loadMorePosts(): void {
    if (this.isLoading || !this.hasMorePosts) return;

    this.isLoading = true;
    const nextPage = this.page + 1;

    // Aquí iría la lógica real paginada
    console.log(`Loading more posts for page ${nextPage}`);
    this.isLoading = false;
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      this.loadMorePosts();
    }
  }

  canComment(postId: string): boolean {
    const content = this.commentTexts[postId] || '';
    return content.trim().length > 0 && content.length <= 300;
  }

  onComment(postId: string): void {
    // Implementación de comentarios futura
  }

  setPosts(posts: Post[]): void {
    this.posts = posts;
  }

  addPosts(posts: Post[]): void {
    this.posts = [...this.posts, ...posts];
  }

  addPost(post: Post): void {
    this.posts.unshift(post);
  }

  updatePost(updatedPost: Post): void {}

  removePost(postId: string): void {}

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(date).getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInDays < 7) return `${diffInDays}d`;

    return new Date(date).toLocaleDateString();
  }

 refreshFeed(): void {
  this.posts = [];
  this.page = 1;
  this.hasMorePosts = true;
  this.loadInitialPosts(); // ✅ recarga los posts
}
  get hasPosts(): boolean {
    return this.posts.length > 0;
  }

  get showNoPostsMessage(): boolean {
    return !this.hasPosts && !this.isLoading;
  }
}
