import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Memoize, Person, PersonHelper } from '@person/person/resource';
import { Observable } from 'rxjs';

@Component({
  selector: 'peo-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { person: Person; personLoading$: Observable<boolean> }
  ) {}

  @Memoize()
  getPersonFullName(person: Person): string {
    return PersonHelper.getFullName(person);
  }
}
