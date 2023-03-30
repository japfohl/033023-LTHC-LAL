import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoViewType } from '../services/todo.service';

@Component({
  selector: 'app-view-toggler',
  standalone: true,
  imports: [NgFor, NgClass],
  template: `
    <section class="grid">
      <button
        *ngFor="let button of buttons"
        (click)="handleViewTypeChange(button.viewType)"
        [ngClass]="
          viewType === button.viewType ? 'primary' : 'secondary outline'
        "
      >
        {{ button.label }}
      </button>
    </section>
  `,
})
export class ViewTogglerComponent {
  @Input() viewType: TodoViewType = 'all';
  @Output() viewTypeChange = new EventEmitter<TodoViewType>();

  buttons: { label: string; viewType: TodoViewType }[] = [
    {
      label: 'All',
      viewType: 'all',
    },
    {
      label: 'Active',
      viewType: 'active',
    },
    {
      label: 'Completed',
      viewType: 'completed',
    },
  ];

  handleViewTypeChange(viewType: TodoViewType): void {
    this.viewType = viewType;
    this.viewTypeChange.emit(viewType);
  }
}
