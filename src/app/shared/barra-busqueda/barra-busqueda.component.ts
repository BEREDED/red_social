import { Component, EventEmitter, OnInit, Output, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.scss'],
  standalone: false
})
export class BarraBusquedaComponent implements OnInit, OnDestroy {
  @Output() chatSelected = new EventEmitter<number>();
  idChat: number = 0;
  searchTerm: string = '';
  UsuariosRegistrados: any[] = [];
  filteredItems: { tipo: string; valor: string }[] = [];

  // Nuevas propiedades para el componente de resultados
  showSearchResults: boolean = false;
  searchResults: { tipo: string; valor: string }[] = [];

  // Subscription para el router
  private routerSubscription: Subscription = new Subscription();

  constructor(
    private usuariosService: UsuariosService,
    private router: Router,
    private _location: Location,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.getAllUsuariosYForos();
    this.setupRouterListener();
  }

  ngOnDestroy() {
    // Limpiar subscripciones
    this.routerSubscription.unsubscribe();
  }

  // Escuchar cambios de ruta para limpiar el estado
  private setupRouterListener(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.clearSearchState();
      });
  }

  // Escuchar clicks fuera del componente
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    // Si el click no fue dentro del componente de búsqueda, limpiar estado
    if (!this.elementRef.nativeElement.contains(target)) {
      this.clearSearchState();
    }
  }

  // Escuchar la tecla Escape para cerrar
  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent): void {
    this.clearSearchState();
  }

  // Limpiar el estado de búsqueda
  private clearSearchState(): void {
    this.filteredItems = [];
    this.showSearchResults = false;
    this.searchResults = [];
  }

  // Limpiar completamente incluyendo el término de búsqueda
  private clearCompleteState(): void {
    this.searchTerm = '';
    this.clearSearchState();
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

    if (term.trim() === '') {
      this.filteredItems = [];
      return;
    }

    this.filteredItems = this.UsuariosRegistrados.filter(item =>
      item.valor.toLowerCase().includes(term)
    );
  }

  selectItem(item: any): void {
    this.searchTerm = item.valor;
    this.clearSearchState(); // Limpiar estado al seleccionar
    this.navigateToItem(item);
  }

  // Nueva función para manejar la búsqueda con el modal
  onSearch(): void {
    const term = this.searchTerm.trim();

    if (term === '') {
      console.warn('El término de búsqueda está vacío');
      this.clearSearchState();
      return;
    }

    // Filtrar resultados
    this.searchResults = this.UsuariosRegistrados.filter(item =>
      item.valor.toLowerCase().includes(term.toLowerCase())
    );

    // Limpiar sugerencias y mostrar resultados
    this.filteredItems = [];
    this.showSearchResults = true;
  }

  // Función para manejar la selección desde el modal
  onResultSelected(result: { tipo: string; valor: string }): void {
    this.searchTerm = result.valor;
    this.clearSearchState(); // Limpiar estado al seleccionar
    this.navigateToItem(result);
  }

  // Función para cerrar el modal
  onCloseResults(): void {
    this.clearSearchState();
  }

  // Función para limpiar búsqueda (opcional, para botón de limpiar)
  onClearSearch(): void {
    this.clearCompleteState();
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
