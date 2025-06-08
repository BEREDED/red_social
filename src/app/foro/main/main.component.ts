import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone:false
})
export class MainComponent  implements OnInit {

  Titulo_foro: string = '';
  description:string='';
  isinscrito:boolean=false;

  constructor(private route: ActivatedRoute,private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.Titulo_foro = this.route.snapshot.paramMap.get('titulo') || '';
    console.log("Foro recibido:", this.Titulo_foro);
    this.ConseguirData(this.Titulo_foro )
    this.isUsersuscribed(this.Titulo_foro,String(localStorage.getItem("correoGlobal")))
  }
  public isUsersuscribed(Titulo_foro:string,correo:string){
    return this.usuariosService.postissuscribed(Titulo_foro,correo).subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
      }
    });
  }
  public ConseguirData(Titulo_foro:string){
    console.log("este es el nombre que se manda a la funcion:",this.Titulo_foro)
    this.usuariosService.getInfoForo(this.Titulo_foro).subscribe({
      next:(response)=>{
        this.Titulo_foro=this.Titulo_foro;
        this.description=response.Descripcion;
        console.log(response.Descripcion);
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
