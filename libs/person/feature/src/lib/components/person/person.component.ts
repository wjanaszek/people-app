import { Component, OnInit } from '@angular/core';
import { Person } from '@person/person/resource';

@Component({
  selector: 'peo-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {
  personCollection: Person[];
  personCollectionLoading = true;

  constructor() {}

  ngOnInit() {}

  reloadList(): void {}
}
