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

  nombrecompleto:string=''
  constructor(private usuariosService: UsuariosService) {
   }

  ngOnInit() {}
}
