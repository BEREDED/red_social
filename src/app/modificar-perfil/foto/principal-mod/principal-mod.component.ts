import { Component, OnInit } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { Location } from '@angular/common';

@Component({
  selector: 'app-principal-mod',
  templateUrl: './principal-mod.component.html',
  styleUrls: ['./principal-mod.component.scss'],
  standalone:false
})
export class PrincipalModComponent  implements OnInit {

  isEditing: boolean = false;

  constructor(private _location: Location) {}

  goBack(){
    this._location.back();
  }

  ngOnInit() {}

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  acceptEdit() {
    this.isEditing = false;
  }
}
