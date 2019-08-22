import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Person, PersonHelper } from '@person/person/resource';
import { MatDialog, Sort } from '@angular/material';
import { EMPTY, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DetailsDialogComponent } from '@person/person/ui-details-dialog';
import { PersonDataService } from '@person/person/data-access';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'peo-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  personCollection: Person[];
  personCollectionLoading = true;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private personDataService: PersonDataService
  ) {}

  ngOnInit() {
    this.loadPersonCollection();
  }

  onOpenDetails(person: Person): void {
    this.dialog.open(DetailsDialogComponent, {
      data: {
        person$: this.loadPerson(person)
      }
    });
  }

  onSortData(sort: Sort): void {
    if (sort.active === 'lastName') {
      this.personCollection = PersonHelper.sortByLastName(
        this.personCollection,
        sort
      );
    }
  }

  reloadList(): void {
    this.loadPersonCollection(true);
  }

  private loadPerson(person: Person): Observable<Person> {
    return this.personDataService.getPerson({ id: person.id });
  }

  private loadPersonCollection(overrideCache = false): void {
    this.personDataService
      .getPersonCollection({ overrideCache })
      .pipe(
        finalize(() => {
          this.personCollectionLoading = false;
          this.changeDetectorRef.markForCheck();
        }),
        catchError((err: HttpErrorResponse) => {
          return EMPTY;
        })
      )
      .subscribe(
        personCollection => (this.personCollection = personCollection)
      );
  }
}
