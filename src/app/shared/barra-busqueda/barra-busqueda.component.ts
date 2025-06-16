import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.scss'],
  standalone: false
})
export class BarraBusquedaComponent implements OnInit {
  @Output() chatSelected = new EventEmitter<number>();
  idChat: number = 0;
  searchTerm: string = '';
  UsuariosRegistrados: any[] = [];
  filteredItems: { tipo: string; valor: string }[] = [];

  // Nuevas propiedades para el componente de resultados
  showSearchResults: boolean = false;
  searchResults: { tipo: string; valor: string }[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit() {
    this.getAllUsuariosYForos();
  }

  getAllUsuariosYForos() {
    this.usuariosService.getallUsers_foros(true).subscribe({
      next: (response) => {
        const usuarios = response.usuarios || [];
        const foros = response.foros || [];
        this.UsuariosRegistrados = [
          ...usuarios.map((u: any) => ({ tipo: 'usuario', valor: u.Correo })),
          ...foros.map((f: any) => ({ tipo: 'foro', valor: f.Titulo_foro }))
        ];
      },
      error: (err) => {
        console.error('Error al obtener usuarios y foros', err);
      }
    });
  }

  filterItems(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredItems = this.UsuariosRegistrados.filter(item =>
      item.valor.toLowerCase().includes(term)
    );
  }

  selectItem(item: any): void {
    this.searchTerm = item.valor;
    this.filteredItems = [];
    this.navigateToItem(item);
  }

  // Nueva función para manejar la búsqueda con el modal
  onSearch(): void {
    const term = this.searchTerm.trim();

    if (term === '') {
      console.warn('El término de búsqueda está vacío');
      return;
    }

    // Filtrar resultados
    this.searchResults = this.UsuariosRegistrados.filter(item =>
      item.valor.toLowerCase().includes(term.toLowerCase())
    );

    // Mostrar el modal de resultados
    this.showSearchResults = true;
  }

  // Función para manejar la selección desde el modal
  onResultSelected(result: { tipo: string; valor: string }): void {
    this.searchTerm = result.valor;
    this.showSearchResults = false;
    this.navigateToItem(result);
  }

  // Función para cerrar el modal
  onCloseResults(): void {
    this.showSearchResults = false;
  }

  // Función auxiliar para la navegación
  private navigateToItem(item: { tipo: string; valor: string }): void {
    if (item.tipo === 'usuario') {
      if (item.valor !== localStorage.getItem('correoGlobal')) {
        this.router.navigate(['/chats']);
        const fecha = new Date();
        const Creado_en = fecha.toISOString().slice(0, 16).replace('T', ' ');

        this.usuariosService.nuevoChat(
          String(localStorage.getItem('correoGlobal')),
          item.valor,
          Creado_en
        ).subscribe({
          next: (res) => {
            const idChat = res.Id_Chat;
            console.log('ID del chat obtenido o creado:', idChat);
            this.router.navigate(['/chats'], {
              queryParams: { chatId: idChat }
            });
          },
          error: (err) => {
            console.error('Error al iniciar o obtener el chat:', err);
          }
        });
      }
    } else if (item.tipo === 'foro') {
      this.router.navigate(['/foro', item.valor]);
    }
  }
}
