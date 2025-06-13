import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { getdata } from 'src/app/modelos/getdata.interface';



@Component({
  selector: 'app-boton-perfil',
  templateUrl: './boton-perfil.component.html',
  styleUrls: ['./boton-perfil.component.scss'],
  standalone:false
})
export class BotonPerfilComponent  implements OnInit {

  paso= String(localStorage.getItem('nameglb'));
  iniciales= this.paso[0] +this.paso[1]
  getData:getdata={
    Correo:''
  }
  nombrecompleto:string=''
  constructor(private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.getnamedb()
  }
  getnamedb(){
    this.getData.Correo=String(localStorage.getItem('correoGlobal'))
    this.usuariosService.Postsoldata(this.getData).subscribe({
      next: (response) =>{
        localStorage.setItem('nameglb',response.namedb)
      }
      })
    }

}

