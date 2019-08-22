import { Person } from './person.model';
import { Sort } from '@angular/material';

export class PersonHelper {
  static getFullName(person: Person): string {
    return `${person.first_name} ${person.last_name}`;
  }

  static sortByLastName(personCollection: Person[], sort: Sort): Person[] {
    return personCollection.sort((a: Person, b: Person) => {
      switch (sort.direction) {
        case 'asc':
          return a.last_name < b.last_name ? 1 : -1;
        case 'desc':
          return a.last_name > b.last_name ? 1 : -1;
        default:
          if (a.last_name < b.last_name) {
            return -1;
          }
          if (a.last_name > b.last_name) {
            return 1;
          }
          return 0;
      }
    });
  }
}
