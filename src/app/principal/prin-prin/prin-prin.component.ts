import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-prin-prin',
  templateUrl: './prin-prin.component.html',
  styleUrls: ['./prin-prin.component.scss'],
  standalone:false
})
export class PrinPrinComponent  implements OnInit {
  email: string = '';

  constructor() { }

  ngOnInit() {  }
}
