import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Person, PERSON_COLLECTION_MOCK_DATA } from '@person/person/resource';

@Component({
  selector: 'peo-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  personCollection: Person[];
  personCollectionLoading = true;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.personCollection = PERSON_COLLECTION_MOCK_DATA;
    setTimeout(() => {
      this.personCollectionLoading = false;
      this.changeDetectorRef.markForCheck();
    }, 2000);
  }

  reloadList(): void {}
}
