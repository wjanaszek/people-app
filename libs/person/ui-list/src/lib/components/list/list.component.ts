import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Memoize, Person, PersonHelper } from '@person/person/resource';

@Component({
  selector: 'peo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input()
  personCollection: Person[];
  @Input()
  personCollectionLoading: boolean;

  @Memoize()
  getPersonFullName(person: Person): string {
    return PersonHelper.getFullName(person);
  }

  trackByFn(index: number, person: Person): string {
    return `${index}${person.id}`;
  }
}
