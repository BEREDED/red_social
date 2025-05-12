// side-panel.component.ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
  standalone:false

})
export class SideComponent implements OnInit {
  @Input() title: string = 'HOME';

  // Variables para controlar la expansión de los acordeones
  accordionOneExpanded: boolean = false;
  accordionTwoExpanded: boolean = false;

  // Datos para el primer acordeón
  accordionOneItems = [
    { name: 'Opción 1', selected: false },
    { name: 'Opción 2', selected: false },
    { name: 'Opción 3', selected: true },
    { name: 'Opción 4', selected: false }
  ];

  // Datos para el segundo acordeón
  accordionTwoItems = [
    { name: 'Elemento A', icon: 'document-text', route: '/documents' },
    { name: 'Elemento B', icon: 'analytics', route: '/statistics' },
    { name: 'Elemento C', icon: 'settings', route: '/settings' }
  ];

  constructor() { }

  ngOnInit() {}

  // Método para alternar el estado del acordeón
  toggleAccordion(accordion: string) {
    if (accordion === 'one') {
      this.accordionOneExpanded = !this.accordionOneExpanded;
    } else if (accordion === 'two') {
      this.accordionTwoExpanded = !this.accordionTwoExpanded;
    }
  }

  // Método para seleccionar una opción del primer acordeón
  selectOption(item: any) {
    this.accordionOneItems.forEach(option => {
      option.selected = (option === item);
    });
  }
}
