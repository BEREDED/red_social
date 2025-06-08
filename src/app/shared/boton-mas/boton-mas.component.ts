import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { foros } from 'src/app/modelos/foro.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-boton-mas',
  templateUrl: './boton-mas.component.html',
  styleUrls: ['./boton-mas.component.scss'],
  standalone:false
})
export class BotonMasComponent  implements OnInit {
  Foros_send:foros={
    Correo_Creador:'',
    Titulo_foro:'',
    Descripcion:'',
    Fecha_creacion:''
  }
  @Output() foroCreado = new EventEmitter<void>();
  desplegado = false;
  showCrearForoModal = false;
  foroName: string = '';
  foroDesc: string = '';

  constructor(private router: Router,private usuariosService: UsuariosService) { }

  ngOnInit(): void {}

  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }

  openCrearForoModal() {
    console.log('openCrearForoModal called');
    this.showCrearForoModal = true;
    this.desplegado = false;
  }

  closeCrearForoModal() {
    this.showCrearForoModal = false;
    this.foroName = '';
    this.foroDesc='';
  }

  crearForo() {
    console.log('Crear foro:', this.foroName, this.foroDesc);
    this.Foros_send.Correo_Creador=String(localStorage.getItem('correoGlobal'))
    this.Foros_send.Descripcion=this.foroDesc
    this.Foros_send.Titulo_foro=this.foroName
    this.Foros_send.Fecha_creacion=new Date().toISOString().split('T')[0];
    console.log(this.Foros_send)
    this.usuariosService.postCreacionForo(this.Foros_send).subscribe({
      next: (response)=>{
        console.log(response)
        this.closeCrearForoModal();
        this.foroCreado.emit();
      },
      error: (error)=>{
        console.log(error)
      }
    })
    this.foroCreado.emit();

  }

  crearGrupo() {
    console.log('Crear grupo');
    this.router.navigate(['/crear-grupo']);
  }

}
