import {Component, computed, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChecklistService} from '../shared/data-access/checklist.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {ChecklistHeaderComponent} from './ui/checklist-header.component';

@Component({
  selector: 'app-checklist',
  template: `
    @if (checklist(); as checklist) {
      <app-checklist-header [checklist]="checklist"/>
    }`,
  imports: [
    ChecklistHeaderComponent
  ]
})
export default class ChecklistComponent {
  checklistService = inject(ChecklistService);
  route = inject(ActivatedRoute);

  params = toSignal(this.route.paramMap);

  checklist = computed(() =>
    this.checklistService
      .checklists()
      .find((checklist) => checklist.id === this.params()?.get('id'))
  );
}
