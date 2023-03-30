import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { map, Observable } from 'rxjs';
import { TodoService, TodoView } from '../services/todo.service';

interface ToggleButton {
  label: string;
  viewType: TodoView;
  class: string;
}

const defaultButtons: Pick<ToggleButton, 'label' | 'viewType'>[] = [
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

@Component({
  selector: 'app-view-toggler',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, AsyncPipe],
  template: `
    <section class="grid">
      <button
        *ngFor="let button of buttons$ | async"
        (click)="todoService.setViewType(button.viewType)"
        [class]="button.class"
      >
        {{ button.label }}
      </button>
    </section>
  `,
})
export class ViewTogglerComponent {
  todoService = inject(TodoService);

  buttons$: Observable<ToggleButton[]> = this.todoService.viewtype$.pipe(
    map((view) =>
      defaultButtons.map(({ label, viewType }) => ({
        label,
        viewType,
        class: view === viewType ? 'primary' : 'secondary outline',
      }))
    )
  );
}
