import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Memoize, Person, PersonHelper } from '@person/person/resource';
import { MatSort, MatTableDataSource, Sort } from '@angular/material';

@Component({
  selector: 'peo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  dataSource = new MatTableDataSource<Person>();
  displayedColumns = ['avatar', 'firstName', 'lastName'];

  @Output()
  openDetails = new EventEmitter<Person>();

  @Input()
  set personCollection(personCollection: Person[]) {
    this.dataSource.data = personCollection;
  }
  @Input()
  personCollectionLoading: boolean;

  @ViewChild(MatSort, { static: false })
  sort: MatSort;

  @Output()
  sortData = new EventEmitter<Sort>();

  ngOnInit(): void {
    this.initSort();
  }

  onOpenDetails(person: Person): void {
    this.openDetails.emit(person);
  }

  onSortData(sort: Sort): void {
    this.sortData.emit(sort);
  }

  trackByFn(index: number, person: Person): string {
    return `${index}${person.id}`;
  }

  private initSort(): void {
    this.dataSource.data = [];
    this.dataSource.sort = this.sort;
  }
}
