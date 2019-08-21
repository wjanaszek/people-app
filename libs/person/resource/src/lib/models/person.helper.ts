import { Person } from './person.model';

export class PersonHelper {
  static getFullName(person: Person): string {
    return `${person.first_name} ${person.last_name}`;
  }
}
