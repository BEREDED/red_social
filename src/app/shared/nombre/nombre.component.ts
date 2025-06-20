import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PrincipalModComponent } from 'src/app/modificar-perfil/principal-mod/principal-mod.component';

@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.scss'],
  standalone:false,
  template: `<input type="text" [(ngModel)]="Nombre" />`,
})
export class NombreComponent implements OnInit {
  @Input() Nombre: string = '';

  onNombreChange(value: string) {
    if (value.length < 49) {
      this.Nombre = value;}}


  ngOnInit() {}
}
