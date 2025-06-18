import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { JoinExitComponent } from '../join-exit/join-exit.component'; // Ajusta la ruta según tu estructura


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  standalone:false
})
export class PanelComponent  implements OnInit {
  @Input() Titulo_foro: string = '';
  @Input() description: string = '';
  @Input() isinscrito:boolean=false;
  @ViewChild('joinExitRef') joinExitComponent!: JoinExitComponent;

  accordionOneExpanded: boolean = false;
  inscritos:any[]=[]
  showConfirmationPopup: boolean = false;

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit() {
  this.getUsuer(this.Titulo_foro); // ← Aquí se hace la llamada al cargar el componente
  }
  getUsuer(titulo_foro:string){
    console.log(titulo_foro)
    this.usuariosService.getUsuariosEnforo(this.Titulo_foro).subscribe({
      next: (response) =>{
        console.log("aaaaaa",response.inscritos);
        this.inscritos=response.inscritos
      }
    })
  }
  clik_userforo(Correo:string){
    console.log("clik en elemto de la lista que es:",Correo );
    if (Correo !== localStorage.getItem('correoGlobal')) {
        this.router.navigate(['/chats']);
        const fecha=new Date();
        const Creado_en=fecha.toISOString().slice(0, 16).replace('T', ' ');
        console.log(String(localStorage.getItem('correoGlobal')),"a",Correo, Creado_en)
        this.usuariosService.nuevoChat(String(localStorage.getItem('correoGlobal')), Correo, Creado_en).subscribe({
      next: (res) =>{
        const idChat = res.Id_Chat;
        this.router.navigate(['/chats'], {
          queryParams: { chatId: idChat }
        });
    },
      error: (err) => {
        console.error('Error al iniciar o obtener el chat:', err);
      }
    });
      }
  }

  // Método para alternar el estado del acordeón
  toggleAccordion(accordion: string) {
    if (accordion === 'one') {
      this.accordionOneExpanded = !this.accordionOneExpanded;
    }
  }

  // Métodos para el popup de confirmación
  onExitRequested() {
    this.showConfirmationPopup = true;
  }

  onConfirmExit() {
    this.showConfirmationPopup = false;
    // Llamar al método del botón para completar la salida
    this.joinExitComponent.confirmExit();
    console.log('Usuario confirmó salir del foro');
  }

  onCancelExit() {
    this.showConfirmationPopup = false;
    console.log('Usuario canceló salir del foro');
  }

  // Método de prueba (puedes eliminarlo después)
  showExitConfirmation() {
    this.showConfirmationPopup = true;
  }
}
