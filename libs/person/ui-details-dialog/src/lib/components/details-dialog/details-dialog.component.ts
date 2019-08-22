import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Memoize, Person, PersonHelper } from '@person/person/resource';
import { EMPTY, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'peo-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsDialogComponent implements OnInit {
  person: Person | null = null;
  personLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { person$: Observable<Person> },
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @Memoize()
  getPersonFullName(person: Person): string {
    return PersonHelper.getFullName(person);
  }

  ngOnInit(): void {
    this.initPerson();
  }

  private initPerson(): void {
    this.data.person$
      .pipe(
        finalize(() => {
          this.personLoading = false;
          this.changeDetectorRef.markForCheck();
        }),
        catchError(() => {
          return EMPTY;
        })
      )
      .subscribe(person => (this.person = person));
  }
}
