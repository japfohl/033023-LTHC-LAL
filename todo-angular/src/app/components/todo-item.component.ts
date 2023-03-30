import { NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo, TodoChange } from '../models/todo.model';

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
          (change)="toggleTodo.emit({ id: todo.id, done: !todo.done })"
        />
        <p
          class="todo-item--text"
          [ngClass]="{ 'todo-item--text__done': todo.done }"
        >
          {{ todo.description }}
        </p>
        <button
          class="contrast outline todo-item--delete-button"
          (click)="deleteTodo.emit(todo.id)"
        >
          X
        </button>
      </li>
    </ng-container>
  `,
})
export class TodoComponent {
  @Input() todo?: Todo;

  @Output() toggleTodo = new EventEmitter<TodoChange>();
  @Output() deleteTodo = new EventEmitter<string>();
}
