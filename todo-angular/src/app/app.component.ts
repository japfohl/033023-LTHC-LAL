import { Component, inject } from '@angular/core';
import { TodoFormComponent } from './components/todo-form.component';
import { TodoListComponent } from './components/todo-list.component';
import { ViewTogglerComponent } from './components/view-toggler.component';
import { TodoChange } from './models/todo.model';
import { TodoService, TodoViewType } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoFormComponent, TodoListComponent, ViewTogglerComponent],
  template: `
    <header class="container">
      <h1>SPA Lunch &amp; Learn - 3/30/2023</h1>
    </header>

    <main class="container">
      <app-todo-form (addTodo)="addTodo($event)" />
      <app-todo-list
        [todos]="todoService.todos"
        (toggleTodo)="handleToggleTodo($event)"
        (deleteTodo)="handleDeleteTodo($event)" />
      <app-view-toggler
        [viewType]="todoService.viewType"
        (viewTypeChange)="handleChangeViewType($event)" />
    </main>
  `,
})
export class AppComponent {
  todoService = inject(TodoService);

  addTodo(description: string): void {
    this.todoService.addTodo(description);
  }

  handleToggleTodo(change: TodoChange) {
    this.todoService.setTodoStatus(change.id, change.done);
  }

  handleDeleteTodo(id: string): void {
    this.todoService.deleteTodo(id);
  }

  handleChangeViewType(viewType: TodoViewType): void {
    this.todoService.setViewType(viewType);
  }
}
