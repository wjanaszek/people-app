import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Memoize, Person, PersonHelper } from '@people/person/resource';
import { EMPTY, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import {
  DomSanitizer,
  SafeResourceUrl,
  SafeStyle
} from '@angular/platform-browser';

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
    private changeDetectorRef: ChangeDetectorRef,
    private dialogRef: MatDialogRef<DetailsDialogComponent>,
    private sanitizer: DomSanitizer
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  @Memoize()
  getPersonFullName(person: Person): string {
    return PersonHelper.getFullName(person);
  }

  ngOnInit(): void {
    this.initPerson();
  }

  @Memoize()
  sanitizeStyle(url: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(url);
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
