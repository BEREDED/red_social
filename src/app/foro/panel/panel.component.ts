import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  standalone:false
})
export class PanelComponent  implements OnInit {
  @Input() Titulo_foro: string = '';
  @Input() description: string = '';
  @Input() isinscrito: boolean=false;
  constructor() { }

  ngOnInit() {}

}
