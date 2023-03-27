import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgIf, NgClass],
  template: `
    <ng-container *ngIf="todo as todo">
      <li class="todo-item">
        <input
          [checked]="todo.done"
          type="checkbox"
          class="todo-item--checkbox"
        />
        <p
          class="todo-item--text"
          [ngClass]="{ 'todo-item--text__done': todo.done }"
        >
          {{ todo.description }}
        </p>
        <button class="contrast outline todo-item--delete-button">&Chi;</button>
      </li>
    </ng-container>
  `,
})
export class TodoComponent {
  @Input() todo?: Todo;
}
