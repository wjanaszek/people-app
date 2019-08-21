import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Person, PERSON_COLLECTION_MOCK_DATA } from '@person/person/resource';
import { MatDialog } from '@angular/material';
import { DetailsDialogComponent } from '../../../../../ui-details-dialog/src/lib/components/details-dialog/details-dialog.component';
import { of } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

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

  reloadList(): void {}
}
