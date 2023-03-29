import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Todo } from '../models/todo';
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
          [todo]="todo" />
      </ul>
    </section>
  `,
})
export class TodoListComponent {
  @Input() todos: Todo[] = [];

  trackTodo(_: number, todo: Todo): string {
    return todo.id;
  }
}
