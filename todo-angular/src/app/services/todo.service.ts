import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  scan,
  startWith,
  Subject,
  withLatestFrom,
} from 'rxjs';
import { Todo } from '../models/todo.model';

export type TodoView = 'all' | 'completed' | 'active';

export enum ACTIONS {
  add = 1,
  delete = 2,
  set = 3,
}

export interface SetTodoPayload {
  id: string;
  done: boolean;
}

export interface TodoActionPayload {
  [ACTIONS.add]: string;
  [ACTIONS.delete]: string;
  [ACTIONS.set]: SetTodoPayload;
}

export interface TodoActionWithPayload<T extends ACTIONS> {
  type: T;
  payload: TodoActionPayload[T];
}

export type TodoAction<T extends ACTIONS> = TodoActionWithPayload<T>;

@Injectable({ providedIn: 'root' })
export class TodoService {
  private _viewType = new BehaviorSubject<TodoView>('all');
  private _todoActions = new Subject<TodoAction<ACTIONS>>();

  public viewtype$ = this._viewType.asObservable();
  private allTodos$: Observable<Todo[]> = this._todoActions.pipe(
    scan((todos, action) => {
      switch (action.type) {
        case ACTIONS.add:
          return [
            ...todos,
            {
              id: crypto.randomUUID(),
              done: false,
              description: action.payload as string,
            },
          ];
        case ACTIONS.delete:
          return todos.filter((t) => t.id !== (action.payload as string));
        case ACTIONS.set:
          const payload = action.payload as SetTodoPayload;
          return todos.map((todo) => {
            return todo.id === payload.id
              ? {
                  ...todo,
                  done: payload.done,
                }
              : todo;
          });
        default:
          return todos;
      }
    }, [] as Todo[]),
    startWith([])
  );

  public todos$ = combineLatest([this.viewtype$, this.allTodos$]).pipe(
    map(([view, todos]) =>
      todos.filter(
        (todo) =>
          view === 'all' ||
          (view === 'active' && !todo.done) ||
          (view === 'completed' && todo.done)
      )
    )
  );

  addTodo(description: string): void {
    this._todoActions.next({
      type: ACTIONS.add,
      payload: description,
    });
  }

  deleteTodo(id: string): void {
    this._todoActions.next({
      type: ACTIONS.delete,
      payload: id,
    });
  }

  setTodoStatus(id: string, done: boolean): void {
    this._todoActions.next({
      type: ACTIONS.set,
      payload: { id, done },
    });
  }

  setViewType(viewType: TodoView): void {
    this._viewType.next(viewType);
  }
}
