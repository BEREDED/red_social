// side-panel.component.ts
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
  standalone: false
})
export class SideComponent implements OnInit {
  @Input() title: string = 'HOME';

  // Variables para controlar la expansión de los acordeones
  accordionOneExpanded: boolean = true;
  accordionTwoExpanded: boolean = false;

  // Variable para el foro activo
  currentForumTitle: string = '';

  // Variable para el estado móvil
  mobileExpanded: boolean = false;

  // Datos para acordeones (mantenidos para compatibilidad)

  gruposInscritos:any[]=[];
  forosInscritos: any[] = [];

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    // Escuchar cambios de ruta para actualizar el foro activo
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateCurrentForum(event.url);
      // Cerrar panel móvil al navegar
      this.mobileExpanded = false;
    });
  }

  ngOnInit() {
    this.getForos();
    this.getGrupos();
    this.updateCurrentForum(this.router.url);
  }

  // Escuchar redimensionamiento de ventana
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Cerrar panel móvil si la pantalla se hace más grande
    if (event.target.innerWidth > 768) {
      this.mobileExpanded = false;
    }
  }

  // Método para alternar el estado del acordeón
  toggleAccordion(accordion: string) {
    if (accordion === 'one') {
      this.accordionOneExpanded = !this.accordionOneExpanded;
    } else if (accordion === 'two') {
      this.accordionTwoExpanded = !this.accordionTwoExpanded;
    }
  }

  // Método para alternar panel móvil
  toggleMobilePanel() {
    this.mobileExpanded = !this.mobileExpanded;
  }

  // Método para cerrar panel móvil
  closeMobilePanel() {
    this.mobileExpanded = false;
  }

  /* Método para seleccionar una opción del primer acordeón
  selectOption(item: any) {
    this.accordionOneItems.forEach(option => {
      option.selected = (option === item);
    });
  }
*/
  // Método para obtener los foros
  getForos(): void {
    const correo = localStorage.getItem('correoGlobal');
    if (!correo) return;

    this.usuariosService.getListadoForos(correo).subscribe({
      next: (response: any) => {
        console.log("Foros recibidos:", response.foros_Inscritos);
        this.forosInscritos = response.foros_Inscritos;
        this.updateCurrentForum(this.router.url);
      },
      error: (err) => console.error('Error al obtener foros:', err)
    });
  }
getGrupos():void{
    const correo = localStorage.getItem('correoGlobal');
    if (!correo) return;
    this.usuariosService.getListadoGrps(correo).subscribe({
      next: (response: any) =>{
        console.log("Grupos recibidos:", response.grupos_Inscritos);
        this.gruposInscritos = response.grupos_Inscritos;
      }
    })
  }
  // Método para actualizar el foro activo basado en la URL
  private updateCurrentForum(url: string): void {
    const foroMatch = url.match(/\/foro\/(.+)$/);
    if (foroMatch) {
      this.currentForumTitle = decodeURIComponent(foroMatch[1]);
    } else {
      this.currentForumTitle = '';
    }
  }

  // Método para verificar si un foro está activo
  isForumActive(foroTitulo: string): boolean {
    return this.currentForumTitle === foroTitulo;
  }

  // Método para navegar a un foro
  navigateToForum(foro: any): void {
    this.router.navigate(['/foro', foro.Titulo_foro]);
    // Cerrar panel móvil después de navegar
    this.mobileExpanded = false;
  }
  navigateToGrupo(grupo:any){
     this.router.navigate(['/grupo',grupo.Nombre_Grupo]);
    this.mobileExpanded = false;
  }
  // Método para obtener clases CSS dinámicas
  getForumItemClasses(foro: any): string {
    const baseClasses = 'forum-item';
    const activeClass = this.isForumActive(foro.Titulo_foro) ? 'active-forum' : '';
    return `${baseClasses} ${activeClass}`.trim();
  }
}
