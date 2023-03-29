import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private _todos: Todo[];

  public get todos(): Todo[] {
    return this._todos;
  }

  constructor() {
    this._todos = [
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

  addTodo(description: string): void {
    this._todos = [
      ...this._todos,
      {
        id: crypto.randomUUID(),
        description,
        done: false,
      },
    ];
  }

  setTodoStatus(id: string, done: boolean): void {
    this._todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, done } : todo
    );
  }
}
