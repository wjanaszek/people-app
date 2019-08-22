import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  Person,
  PERSON_COLLECTION_MOCK_DATA,
  PersonHelper
} from '@person/person/resource';
import { MatDialog, Sort } from '@angular/material';
import { of } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';
import { DetailsDialogComponent } from '@person/person/ui-details-dialog';

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
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.personCollection = PERSON_COLLECTION_MOCK_DATA;
    setTimeout(() => {
      this.personCollectionLoading = false;
      this.changeDetectorRef.markForCheck();
    }, 2000);
  }

  onOpenDetails(person: Person): void {
    this.dialog.open(DetailsDialogComponent, {
      data: {
        person,
        personLoading$: of(false).pipe(
          startWith(true),
          delay(1500)
        )
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

  reloadList(): void {}
}
