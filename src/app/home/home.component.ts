import {Component, effect, inject, signal} from '@angular/core';
import {ModalComponent} from '../shared/ui/modal.component';
import {Checklist} from '../shared/interfaces/checklist';
import {FormBuilder} from '@angular/forms';
import {FormModalComponent} from '../shared/ui/form-modal.component';
import {ChecklistService} from '../shared/data-access/checklist.service';
import {ChecklistListComponent} from './ui/checklist-list.component';

@Component({
  selector: 'app-home',
  template: `
    <header>
      <h1>Quicklists</h1>
      <app-checklist-list [checklists]="checklistService.checklists()"></app-checklist-list>
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
            (save)="checklistService.add$.next(checklistForm.getRawValue())"
            (close)="checklistBeingEdited.set(null)"
          />
        </ng-template>
      </app-modal>
    </header>
  `,
  imports: [
    ModalComponent,
    FormModalComponent,
    ChecklistListComponent
  ]
})
export default class HomeComponent {
  formBuilder = inject(FormBuilder);
  checklistService = inject(ChecklistService);

  checklistBeingEdited = signal<Partial<Checklist> | null>(null);

  checklistForm = this.formBuilder.nonNullable.group({
    title: [''],
  });

  constructor() {
    effect(() => {
      const checklist = this.checklistBeingEdited();

      if (!checklist) {
        this.checklistForm.reset();
      }
    });
  }
}
