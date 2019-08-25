import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Person, PersonHelper } from '@people/person/resource';
import { MatDialog, Sort } from '@angular/material';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, filter, finalize, map, takeUntil } from 'rxjs/operators';
import { DetailsDialogComponent } from '@people/person/ui-details-dialog';
import { PersonDataService } from '@people/person/data-access';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'peo-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnDestroy, OnInit {
  isError: boolean;
  personCollection: Person[];
  personCollectionLoading: boolean;

  private ngUnsubscribe = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location,
    private personDataService: PersonDataService
  ) {}

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    this.loadPersonCollection();
    this.initRouteParams();
  }

  onOpenDetails(person: Person): void {
    this.location.replaceState(`person/${person.id}`);
    this.openDetailsDialog(person.id);
  }

  onSortData(sort: Sort): void {
    if (sort.active === 'lastName') {
      this.personCollection = [
        ...PersonHelper.sortByLastName(this.personCollection, sort)
      ];
    }
  }

  reloadList(): void {
    this.loadPersonCollection(true);
  }

  private initRouteParams(): void {
    this.activatedRoute.params
      .pipe(
        filter(params => !!params && !!params.id),
        map(params => params.id),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(id => this.openDetailsDialog(id));
  }

  private loadPerson(id: number): Observable<Person> {
    return this.personDataService.getPerson({ id });
  }

  private loadPersonCollection(overrideCache = false): void {
    this.isError = false;
    this.personCollectionLoading = true;

    this.personDataService
      .getPersonCollection({ overrideCache })
      .pipe(
        finalize(() => {
          this.personCollectionLoading = false;
        }),
        catchError(() => {
          this.isError = true;
          return EMPTY;
        })
      )
      .subscribe(
        personCollection => (this.personCollection = personCollection)
      );
  }

  private openDetailsDialog(id: number): void {
    this.dialog
      .open(DetailsDialogComponent, {
        data: {
          person$: this.loadPerson(id)
        }
      })
      .afterClosed()
      .subscribe(() => this.location.replaceState('person'));
  }
}
