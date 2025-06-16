import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  standalone: false
})
export class SearchResultsComponent {
  @Input() searchResults: { tipo: string; valor: string }[] = [];
  @Input() searchTerm: string = '';
  @Input() isVisible: boolean = false;
  @Output() resultSelected = new EventEmitter<{ tipo: string; valor: string }>();
  @Output() closeResults = new EventEmitter<void>();

  onResultClick(result: { tipo: string; valor: string }): void {
    this.resultSelected.emit(result);
  }

  onClose(): void {
    this.closeResults.emit();
  }

  // Filtrar resultados por tipo
  get usuariosResults() {
    return this.searchResults.filter(item => item.tipo === 'usuario');
  }

  get forosResults() {
    return this.searchResults.filter(item => item.tipo === 'foro');
  }
}
