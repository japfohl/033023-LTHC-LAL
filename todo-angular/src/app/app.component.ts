import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
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
      <section>
        <ul class="todo-list">
          <li class="todo-item">
            <input type="checkbox" class="todo-item--checkbox" />
            <p class="todo-item--text">Active item</p>
            <button class="contrast outline todo-item--delete-button">
              &Chi;
            </button>
          </li>
          <li class="todo-item">
            <input checked type="checkbox" class="todo-item--checkbox" />
            <p class="todo-item--text todo-item--text__done">Completed item</p>
            <button class="contrast outline todo-item--delete-button">
              &Chi;
            </button>
          </li>
        </ul>
      </section>
      <section class="grid">
        <button class="primary">All</button>
        <button class="secondary outline">Active</button>
        <button class="secondary outline">Completed</button>
      </section>
    </main>
  `,
})
export class AppComponent {}
