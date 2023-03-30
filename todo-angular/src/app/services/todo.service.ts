import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

export type TodoViewType = 'all' | 'completed' | 'active';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private _todos: Todo[];
  private _viewType: TodoViewType = 'all';

  public get todos(): Todo[] {
    return this._todos.filter(({ done }) => {
      return this._viewType === 'all' || (
        this._viewType === 'active' && !done
      ) || (
        this._viewType === 'completed' && done
      )
    })
  }

  public get viewType(): TodoViewType {
    return this._viewType;
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

  deleteTodo(id: string): void {
    this._todos = this._todos.filter(t => t.id !== id);
  }

  setTodoStatus(id: string, done: boolean): void {
    this._todos = this._todos.map((todo) =>
      todo.id === id ? { ...todo, done } : todo
    );
  }

  setViewType(viewType: TodoViewType): void {
    this._viewType = viewType;
  }
}
