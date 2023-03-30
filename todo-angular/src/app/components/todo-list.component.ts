import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo, TodoChange } from '../models/todo.model';
import { TodoComponent } from './todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [NgFor, TodoComponent],
  template: `
    <section>
      <ul class="todo-list">
        <app-todo
          *ngFor="let todo of todos; trackBy: trackTodo"
          [todo]="todo"
          (toggleTodo)="toggleTodo.emit($event)"
          (deleteTodo)="deleteTodo.emit($event)" />
      </ul>
    </section>
  `,
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];

  @Output() toggleTodo = new EventEmitter<TodoChange>();
  @Output() deleteTodo = new EventEmitter<string>();

  trackTodo(_: number, todo: Todo): string {
    return todo.id;
  }
}
