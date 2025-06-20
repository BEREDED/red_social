import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { foros } from 'src/app/modelos/foro.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';

// Interfaz para grupos (igual que foro pero con código en vez de descripción)
interface Grupo {
  Correo_Creador: string;
  Nombre_Grupo: string;
  Clave_Grupo: string;
  Fecha_creacion: string;
}

@Component({
  selector: 'app-boton-mas',
  templateUrl: './boton-mas.component.html',
  styleUrls: ['./boton-mas.component.scss'],
  standalone: false
})
export class BotonMasComponent implements OnInit {
  isProfe: boolean = false;


  // Datos para foros
  Foros_send: foros = {
    Correo_Creador: '',
    Titulo_foro: '',
    Descripcion: '',
    Fecha_creacion: ''
  }

  // Datos para grupos
  Grupo_send: Grupo = {
    Correo_Creador: '',
    Nombre_Grupo: '',
    Clave_Grupo: '',
    Fecha_creacion: '',
  }

  @Output() foroCreado = new EventEmitter<void>();
  @Output() grupoCreado = new EventEmitter<void>();
  @Output() grupoUnido = new EventEmitter<void>();

  // Estados de despliegue y modales
  desplegado = false;
  showCrearForoModal = false;
  showCrearGrupoModal = false;
  showUnirseGrupoModal = false;

  // Campos de formularios
  foroName: string = '';
  foroDesc: string = '';
  grupoName: string = '';
  codigoGrupo: string = '';
  codigoUnirse: string = '';
  errorUnirse: string = '';

  // Validaciones
  isValidName: boolean = true;
  isValidGrupoName: boolean = true;
  isValidLength: boolean = true;

  constructor(private router: Router, private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.validaProf();
  }

  toggleDesplegado() {
    this.desplegado = !this.desplegado;
  }

  // Abrir modales
  openCrearForoModal() {
    console.log('openCrearForoModal called');
    this.showCrearForoModal = true;
    this.desplegado = false;
  }

  openCrearGrupoModal() {
    if (!this.isProfe) {
      console.log('Solo profesores pueden crear grupos');
      return;
    }
    console.log('openCrearGrupoModal called');
    this.showCrearGrupoModal = true;
    this.desplegado = false;
    this.generarCodigoGrupo();
  }

  openUnirseGrupoModal() {
    console.log('openUnirseGrupoModal called');
    this.showUnirseGrupoModal = true;
    this.desplegado = false;
  }

  // Cerrar modales
  closeCrearForoModal() {
    this.showCrearForoModal = false;
    this.foroName = '';
    this.foroDesc = '';
  }

  closeCrearGrupoModal() {
    this.showCrearGrupoModal = false;
    this.grupoName = '';
    this.codigoGrupo = '';
  }

  closeUnirseGrupoModal() {
    this.showUnirseGrupoModal = false;
    this.codigoUnirse = '';
    this.errorUnirse = '';
  }

  // Validaciones
  validateName() {
    const pattern = /@ipn\.mx$|@alumno\.ipn\.mx$/;
    this.isValidName = !pattern.test(this.foroName);
    this.isValidLength = this.foroName.length > 3 && this.foroName.length <= 20;

  }

  validateGrupoName() {
    const pattern = /@ipn\.mx$|@alumno\.ipn\.mx$/;
    this.isValidGrupoName = !pattern.test(this.grupoName);
    this.isValidLength = this.foroName.length > 2 && this.foroName.length <= 20;

  }

  // Generar código aleatorio de 5 caracteres
  generarCodigoGrupo() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 5; i++) {
      codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.codigoGrupo = codigo;
  }

  // Crear foro (lógica existente)
  crearForo() {
    console.log('Crear foro:', this.foroName, this.foroDesc);
    this.Foros_send.Correo_Creador = String(localStorage.getItem('correoGlobal'));
    this.Foros_send.Descripcion = this.foroDesc;
    this.Foros_send.Titulo_foro = this.foroName;
    this.Foros_send.Fecha_creacion = new Date().toISOString().split('T')[0];

    console.log(this.Foros_send);
    this.usuariosService.postCreacionForo(this.Foros_send).subscribe({
      next: (response) => {
        console.log(response);
        this.closeCrearForoModal();
        this.foroCreado.emit();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  // Crear grupo
  crearGrupo() {
    console.log('Crear grupo:', this.grupoName, this.codigoGrupo);
    this.Grupo_send.Correo_Creador = String(localStorage.getItem('correoGlobal'));
    this.Grupo_send.Nombre_Grupo = this.grupoName;
    this.Grupo_send.Clave_Grupo = this.codigoGrupo;
    console.log(this.Grupo_send);
    this.usuariosService.postCreacionGrp(this.Grupo_send).subscribe({
       next: (response) => {
         console.log(response);
         this.closeCrearGrupoModal();
         this.grupoCreado.emit();
       },
       error: (error) => {
         console.log(error);
       }
     });

  }

  // Unirse a grupo
  unirseGrupo(codigoUnirse:string) {

      console.log("codigo de envio: ", this.codigoUnirse)
      this.usuariosService.postUnirCodigo(this.codigoUnirse,String(localStorage.getItem('correoGlobal'))).subscribe({
        next: (response)=>{
          console.log("Te uniste de manera correcta");
        },
        error: (error)=>{
          console.log("no te uniste a ningun grupo")
        }
      })



    console.log('Unirse a grupo con código:', this.codigoUnirse);
    this.errorUnirse = '';

    const datosUnirse = {
      correo: String(localStorage.getItem('correoGlobal')),
      codigo: this.codigoUnirse.toUpperCase()
    };

    // Aquí necesitarías el método del servicio para unirse a grupos
    // this.usuariosService.postUnirseGrupo(datosUnirse).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     this.closeUnirseGrupoModal();
    //     this.grupoUnido.emit();
    //   },
    //   error: (error) => {
    //     console.log(error);
    //     this.errorUnirse = 'Grupo no encontrado. Verifica el código.';
    //   }
    // });

    // Temporal - simular error si código no existe
    if (this.codigoUnirse.toUpperCase() === 'ERROR') {
      this.errorUnirse = 'Grupo no encontrado. Verifica el código.';
      return;
    }

    this.closeUnirseGrupoModal();
    this.grupoUnido.emit();
  }

  validaProf() {
    const pattern = /@ipn\.mx$/;
    if (pattern.test(String(localStorage.getItem('correoGlobal')))) {
      this.isProfe = true;
      console.log('Usuario es profesor');
    }
  }
}
