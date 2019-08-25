import { PersonPage } from './person.po';
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

  it('should be possible to sort people by last name', () => {
    const lastNameColumn = personPage.getLastNameColumn();
    let personCollection = personPage.getPersonCollection();
    const firstPersonId = personCollection.first().getAttribute('id');
    const lastPersonId = personCollection.last().getAttribute('id');

    lastNameColumn.click();

    personCollection = personPage.getPersonCollection();
    const sortedFirstPersonId = personCollection.first().getAttribute('id');
    const sortedLastPersonId = personCollection.last().getAttribute('id');

    expect(sortedFirstPersonId).not.toBe(firstPersonId);
    expect(sortedLastPersonId).not.toBe(lastPersonId);
  });
});
