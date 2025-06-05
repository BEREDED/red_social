import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-boton-perfil',
  templateUrl: './boton-perfil.component.html',
  styleUrls: ['./boton-perfil.component.scss'],
  standalone:false
})
export class BotonPerfilComponent  implements OnInit {

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {}
}
