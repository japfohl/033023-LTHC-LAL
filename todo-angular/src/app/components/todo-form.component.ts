import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <section>
      <form (submit)="onSubmit($event)">
        <input
          class="todo-form"
          type="text"
          placeholder="What has to be done?"
          [formControl]="descriptionControl"
        />
        <small *ngIf="showError">Todo description is required.</small>
      </form>
    </section>
  `,
  styles: [
    `
      small {
        color: var(--del-color);
      }
    `,
  ],
})
export class TodoFormComponent {
  todoService = inject(TodoService);

  descriptionControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  get showError(): boolean {
    return this.descriptionControl.invalid && this.descriptionControl.dirty;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.descriptionControl.valid) {
      this.todoService.addTodo(this.descriptionControl.value);
      this.descriptionControl.reset();
    } else {
      this.descriptionControl.markAsDirty();
      this.descriptionControl.updateValueAndValidity();
    }
  }
}
