import { PersonPage } from './person.po';
// @TODO should be fixed
import 'jasmine';
import { browser } from 'protractor';

describe('Person page', () => {
  const personPage = new PersonPage();

  beforeEach(() => {
    personPage.navigateToPerson();
  });

  it('should display person list', () => {
    expect(personPage.getPersonTable().isPresent()).toBeTruthy();
  });

  it('should show loading indicator when loading person list data', () => {
    expect(personPage.getLoadingIndicator()).toBeDefined();
  });

  it('should open dialog with person details', () => {
    const row = personPage.getPersonCollection().first();
    row.click();
    expect(personPage.getPersonDetailsDialog().isPresent()).toBeTruthy();
  });

  it('should show loading indicator when loading person details', () => {
    const row = personPage.getPersonCollection().first();
    row.click();
    expect(personPage.getLoadingIndicator()).toBeDefined();
  });

  it('should close dialog with person details', () => {
    const row = personPage.getPersonCollection().first();
    row.click();
    const closeDialogButton = personPage.getPersonDetailsDialogCloseButton();
    closeDialogButton.click();
    expect(personPage.getPersonDetailsDialog().isPresent()).toBeFalsy();
  });

  it('should open person details dialog after entering person ID in URL', () => {
    personPage.navigateToPersonWithID(1);
    browser.sleep(1000);
    expect(personPage.getPersonDetailsDialog().isPresent()).toBeTruthy();
  });

  // @TODO fix that test
  it('should be possible to sort people by last name', () => {
    const lastNameColumn = personPage.getLastNameColumn();
    let personCollection = personPage.getPersonCollection();
    const firstPerson = personCollection.first();
    const lastPerson = personCollection.last();

    expect(firstPerson.equals(lastPerson)).toBeFalsy();

    lastNameColumn.click();

    personCollection = personPage.getPersonCollection();
    const sortedFirstPerson = personCollection.last();
    const sortedLastPerson = personCollection.last();

    expect(sortedFirstPerson.equals(firstPerson)).toBeFalsy();
    expect(sortedLastPerson.equals(lastPerson)).toBeFalsy();
  });
});
