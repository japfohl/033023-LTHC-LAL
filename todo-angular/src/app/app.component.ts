import { Component } from '@angular/core';
import { TodoListComponent } from './components/todo-list.component';
import { Todo } from './models/todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoListComponent],
  template: `
    <header class="container">
      <h1>SPA Lunch &amp; Learn - 3/30/2023</h1>
    </header>

    <main class="container">
      <section>
        <input
          class="todo-form"
          type="text"
          name="todoInput"
          id="todoInput"
          placeholder="What has to be done?"
        />
      </section>
      <app-todo-list [todos]="todos"/>
      <section class="grid">
        <button class="primary">All</button>
        <button class="secondary outline">Active</button>
        <button class="secondary outline">Completed</button>
      </section>
    </main>
  `,
})
export class AppComponent {
  todos: Todo[] = [
    {
      id: crypto.randomUUID(),
      description: 'Active todo',
      done: false,
    },
    {
      id: crypto.randomUUID(),
      description: 'Completed todo',
      done: true,
    },
  ];
}
