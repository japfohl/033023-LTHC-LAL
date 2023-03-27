import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({ providedIn: 'root' })
export class TodoService {
  readonly todos: Todo[];

  constructor() {
    this.todos = [
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
}
