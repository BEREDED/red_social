import { Component, OnInit, Output } from '@angular/core';
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
  idChat:number=0;
  searchTerm: string = '';
  UsuariosRegistrados: any[] = [];
  filteredItems: { tipo: string; valor: string }[] = [];


  constructor(private usuariosService: UsuariosService, private router: Router,private _location: Location,) {}

  ngOnInit() {
    this.getAllUsuariosYForos();
  }

  getAllUsuariosYForos() {
    this.usuariosService.getallUsers_foros(true).subscribe({
      next: (response) => {
        const usuarios = response.usuarios || [];
        const foros = response.foros || [];
        // Unificamos en un solo arreglo de objetos con tipo
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

    if (item.tipo === 'usuario') {
      if (item.valor !== localStorage.getItem('correoGlobal')) {
        this.router.navigate(['/chats', item.valor]);
        const fecha=new Date();
        const Creado_en=fecha.toISOString().slice(0, 16).replace('T', ' ');
        console.log(String(localStorage.getItem('correoGlobal')),"a",this.searchTerm)
        this.usuariosService.nuevoChat(String(localStorage.getItem('correoGlobal')), this.searchTerm, Creado_en).subscribe({
      next: (res) => {
        const idChat = res.Id_Chat;
        console.log('ID del chat obtenido o creado:', idChat);
        this.router.navigate(['/chats', this.searchTerm]);
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

  onSearch(): void {
    if (this.searchTerm.endsWith('@ipn.mx') || this.searchTerm.endsWith('@alumno.ipn.mx')) {
      if (this.searchTerm !== localStorage.getItem('correoGlobal')) {
        this.router.navigate(['/chats', this.searchTerm]);
        const fecha=new Date();
        const Creado_en=fecha.toISOString().slice(0, 16).replace('T', ' ');
        console.log(String(localStorage.getItem('correoGlobal')),"a",this.searchTerm, Creado_en)
        this.usuariosService.nuevoChat(String(localStorage.getItem('correoGlobal')), this.searchTerm, Creado_en).subscribe({
      next: (res) => {
        const idChat = res.Id_Chat;
        console.log('ID del chat obtenido o creado:', idChat);
        this.router.navigate(['/chats', this.searchTerm]);
      },
      error: (err) => {
        console.error('Error al iniciar o obtener el chat:', err);
      }
    });
      }
    }
    if (this.searchTerm=' '){
      this._location;
    }
    else {
      this.router.navigate(['/foro', this.searchTerm]);
    }
  }
}
