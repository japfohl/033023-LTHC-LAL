import { AsyncPipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { Todo, TodoChange } from '../models/todo.model';
import { TodoService } from '../services/todo.service';
import { TodoComponent } from './todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgFor, TodoComponent, AsyncPipe],
  template: `
    <section>
      <ul class="todo-list">
        <app-todo
          *ngFor="let todo of todoService.todos$ | async; trackBy: trackTodo"
          [todo]="todo"
          (toggleTodo)="todoService.setTodoStatus(todo.id, !todo.done)"
          (deleteTodo)="todoService.deleteTodo(todo.id)" />
      </ul>
    </section>
  `,
})
export class TodoListComponent {
  todoService = inject(TodoService);

  trackTodo(_: number, todo: Todo): string {
    return todo.id;
  }
}
