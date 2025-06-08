import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
  standalone: false,
})
export class GroupCardComponent {
  @Input() titulo: string = '';
  constructor(){}
  ngOnInit(): void {}
  public send_name(titulo : string): void {
    console.log(this.titulo);
  }
}
