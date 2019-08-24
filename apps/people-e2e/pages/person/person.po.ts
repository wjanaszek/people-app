import {
  browser,
  by,
  element,
  promise,
  ElementFinder,
  ElementArrayFinder
} from 'protractor';

const sleepTime = 1000; // 1s

export class PersonPage {
  navigateToPerson(): promise.Promise<any> {
    return browser.get('/person');
  }

  navigateToPersonWithID(id: number): promise.Promise<any> {
    return browser.get(`/person/${id}`);
  }

  getLoadingIndicator(): ElementFinder {
    return element(by.tagName('mat-spinner'));
  }

  getPersonTable(): ElementFinder {
    browser.sleep(sleepTime);
    return element(by.tagName('mat-table'));
  }

  getPersonCollection(): ElementArrayFinder {
    browser.sleep(sleepTime);
    return element.all(by.tagName('mat-row'));
  }

  getLastNameColumn(): ElementFinder {
    return element(by.css('.mat-column-lastName'));
  }

  getPersonDetailsDialog(): ElementFinder {
    return element(by.tagName('peo-details-dialog'));
  }

  getPersonDetailsDialogCloseButton(): ElementFinder {
    return element(by.css('.details-dialog--actions-close-button'));
  }
}
