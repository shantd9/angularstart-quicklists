import {Component, inject, signal} from '@angular/core';
import {ModalComponent} from '../shared/ui/modal.component';
import {Checklist} from '../shared/interfaces/checklist';
import {FormBuilder} from '@angular/forms';
import {FormModalComponent} from '../shared/ui/form-modal.component';

@Component({
  selector: 'app-home',
  template: `
    <header>
      <h1>Quicklists</h1>
      <button (click)="checklistBeingEdited.set({})">Add Checklist</button>
      <app-modal [isOpen]="!!checklistBeingEdited()">
        <ng-template>
          <app-form-modal
            [title]="
            checklistBeingEdited()?.title
              ? checklistBeingEdited()!.title!
              : 'Add Checklist'
          "
            [formGroup]="checklistForm"
            (close)="checklistBeingEdited.set(null)"
          />
        </ng-template>
      </app-modal>
    </header>
  `,
  imports: [
    ModalComponent,
    FormModalComponent
  ]
})
export default class HomeComponent {
  formBuilder = inject(FormBuilder);

  checklistBeingEdited = signal<Partial<Checklist> | null>(null);

  checklistForm = this.formBuilder.nonNullable.group({
    title: [''],
  });
}
