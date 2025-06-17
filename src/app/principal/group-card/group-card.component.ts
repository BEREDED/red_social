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
  @Input() tipo: string = ''; // ← nuevo
  @Output() titulo_llamada:string= this.titulo;
  constructor(private router: Router) {}
  ngOnInit(): void {}
  public redirigir(tipo : string, titulo:string): void {
    console.log(this.tipo, this.titulo);
    if (tipo === 'grupo') {
      this.router.navigate(['/grupo', titulo]);
    }
    if( tipo === 'foro'){
      this.router.navigate(['/foro',titulo]);
    }
  }
}
