import { NgIf } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
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
  descriptionControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  get showError(): boolean {
    return this.descriptionControl.invalid && this.descriptionControl.dirty;
  }

  @Output() addTodo = new EventEmitter<string>();

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.descriptionControl.valid) {
      this.addTodo.emit(this.descriptionControl.value);
      this.descriptionControl.reset();
    } else {
      this.descriptionControl.markAsDirty();
      this.descriptionControl.updateValueAndValidity();
    }
  }
}
