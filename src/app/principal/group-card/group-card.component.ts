import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
  standalone: false,
})
export class GroupCardComponent {
  @Input() groupName: string = 'grupito :3';
}
