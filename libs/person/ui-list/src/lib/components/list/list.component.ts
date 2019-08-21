import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Person, PersonHelper } from '@person/person/resource';

@Component({
  selector: 'peo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input()
  personCollection: Person[];

  // @TODO add memoize
  getPersonFullName(person: Person): string {
    return PersonHelper.getFullName(person);
  }
}
