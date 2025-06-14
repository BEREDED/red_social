import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';


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

  inscritos:any[]=[]

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
}
