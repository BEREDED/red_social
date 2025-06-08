import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
  standalone: false,
})
export class GroupCardComponent {
  @Input() titulo: string = '';
  @Output() titulo_llamada:string= this.titulo;
  constructor(private router: Router) {}
  ngOnInit(): void {}
  public send_name(titulo : string): void {
    console.log(this.titulo);
    this.router.navigate(['/foro', titulo]);
  }
}
