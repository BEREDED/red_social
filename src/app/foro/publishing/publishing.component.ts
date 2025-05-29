import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publishing',
  templateUrl: './publishing.component.html',
  styleUrls: ['./publishing.component.scss'],
  standalone: false,
})
export class PublishingComponent {
  postContent: string = '';

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
      // Aquí iría la lógica para enviar el post
      console.log('Publicando:', this.postContent);

      // Ejemplo de cómo podrías emitir el evento o llamar a un servicio
      // this.postService.createPost(this.postContent);
      // this.postCreated.emit(this.postContent);

      // Limpiar el textarea después de publicar
      this.postContent = '';

      // Mostrar confirmación
      alert('¡Post publicado exitosamente!');
    }
  }
}
