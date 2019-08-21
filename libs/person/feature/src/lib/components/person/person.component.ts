import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Person, PERSON_COLLECTION_MOCK_DATA } from '@person/person/resource';
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
      this.personCollection = this.personCollection.sort(
        (a: Person, b: Person) => {
          // @TODO move that to some service
          switch (sort.direction) {
            case 'asc':
              return a.last_name < b.last_name ? -1 : 1;
            case 'desc':
              return a.last_name > b.last_name ? -1 : 1;
            default:
              if (a.last_name < b.last_name) {
                return -1;
              }
              if (a.last_name > b.last_name) {
                return 1;
              }
              return 0;
          }
        }
      );
    }
  }

  reloadList(): void {}
}
