import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.scss'],
  standalone:false
})
export class BarraBusquedaComponent  implements OnInit {
  activated:boolean=true;
  searchTerm: string = '';
  filteredUsuarios: any[] = [];
  UsuariosRegistrados: any[] = [];
  constructor( private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.getallusuarios()
  }
  filterUsuarios(): void {
  const term = this.searchTerm.toLowerCase();
  this.filteredUsuarios = this.UsuariosRegistrados.filter(usuario =>
    usuario.Correo.toLowerCase().includes(term)
  );
}
  getallusuarios(){
    this.usuariosService.getallUsers(this.activated).subscribe({
      next: (resposne)=>{
        this.UsuariosRegistrados = resposne.usuario;
        console.log(this.UsuariosRegistrados)
      }
      });
    }
    selectUsuario(usuario: any): void {
  this.searchTerm = usuario.Correo;
  this.filteredUsuarios = [];
  // Aquí puedes agregar lógica para redirigir, mostrar info, etc.
  }
  onSearch(): void {
  // lógica adicional si el usuario presiona el botón 🔍
  }
}


