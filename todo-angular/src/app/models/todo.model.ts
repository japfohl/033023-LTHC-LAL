export interface Todo {
  id: string;
  description: string;
  done: boolean;
}

export type TodoChange = Pick<Todo, 'id' | 'done'>;
