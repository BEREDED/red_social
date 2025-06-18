import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-prin-prin',
  templateUrl: './prin-prin.component.html',
  styleUrls: ['./prin-prin.component.scss'],
  standalone: false
})
export class PrinPrinComponent implements OnInit {

  forosInscritos: any[] = [];
  gruposRegistrados: any[] = [];
  Elementos: any[] = [];

  private forosListos: boolean = false;
  private gruposListos: boolean = false;

  constructor(private usuarioservice: UsuariosService) {}

  ngOnInit(): void {
    this.getForosYGrupos();
  }

  getForosYGrupos(): void {
    const correo = localStorage.getItem('correoGlobal');
    if (!correo) return;

    this.Elementos = [];

    // Obtener foros
    this.usuarioservice.getListadoForos(correo).subscribe({
      next: (response: any) => {
        console.log("Foros recibidos:", response.foros_Inscritos);
        this.forosInscritos = response.foros_Inscritos;

        const forosMapeados = this.forosInscritos.map(f => ({
          nombre: f.Titulo_foro,
          tipo: 'foro'
        }));

        this.Elementos = [...this.Elementos, ...forosMapeados];
        this.forosListos = true;
        this.combinarYMostrar();
      },
      error: (err) => console.error('Error al obtener foros:', err)
    });

    // Obtener grupos
    this.usuarioservice.getListadoGrps(correo).subscribe({
      next: (response: any) => {
        console.log("Grupos recibidos:", response.grupos_Inscritos);
        this.gruposRegistrados = response.grupos_Inscritos;

        const gruposMapeados = this.gruposRegistrados.map(g => ({
          nombre: g.Nombre_Grupo,
          tipo: 'grupo'
        }));

        this.Elementos = [...this.Elementos, ...gruposMapeados];
        this.gruposListos = true;
        this.combinarYMostrar();
      },
      error: (err) => console.error('Error al obtener grupos:', err)
    });
  }

combinarYMostrar() {
  if (this.forosListos && this.gruposListos) {
    this.aplicarFiltro();
  }
}

  crearForo() {
    const foroData = {
      Titulo_foro: 'Nuevo foro',
      Descripcion: 'Ejemplo',
      Fecha_creacion: new Date(),
      Correo_creador: localStorage.getItem('correoGlobal')
    };
  }
  filtroActual: string = 'todo';
ElementosFiltrados: any[] = [];

actualizarFiltro(tipo: string) {
  this.filtroActual = tipo;
  this.aplicarFiltro();
}

aplicarFiltro() {
  if (this.filtroActual === 'todo') {
    this.ElementosFiltrados = [...this.Elementos];
  } else {
    this.ElementosFiltrados = this.Elementos.filter(item => item.tipo === this.filtroActual);
  }
}

}
