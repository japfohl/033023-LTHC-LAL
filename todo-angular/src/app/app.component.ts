import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TodoFormComponent } from './components/todo-form.component';
import { TodoListComponent } from './components/todo-list.component';
import { ViewTogglerComponent } from './components/view-toggler.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoFormComponent, TodoListComponent, ViewTogglerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="container">
      <h1>SPA Lunch &amp; Learn - 3/30/2023</h1>
    </header>

    <main class="container">
      <app-todo-form />
      <app-todo-list />
      <app-view-toggler />
    </main>
  `,
})
export class AppComponent {}
