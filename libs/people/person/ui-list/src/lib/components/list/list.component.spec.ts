import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import {
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  Sort
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Person } from '@people/person/resource';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: `peo-host-component`,
  template: `
    <peo-list
      [personCollectionLoading]="personCollectionLoading"
      [personCollection]="personCollection"
      [isError]="isError"
      (sortData)="onSortData($event)"
      (openDetails)="onOpenDetails($event)"
    ></peo-list>
  `
})
class TestHostComponent {
  isError: boolean;
  personCollection: Person[];
  personCollectionLoading: boolean;

  onSortData(sort: Sort): void {}
  onOpenDetails(person: Person): void {}
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatProgressSpinnerModule
      ],
      declarations: [ListComponent, TestHostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    testHostFixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    testHostComponent = testHostFixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have isError after construction', () => {
    expect(component.isError).toBeUndefined();
  });

  it('should show progress spinner if personCollectionLoading true', () => {
    const listElement: HTMLElement = testHostFixture.nativeElement;
    testHostComponent.personCollectionLoading = true;
    const progressSpinner = listElement.querySelector(
      '.list__spinner--container'
    );
    expect(progressSpinner).toBeDefined();
  });

  it('should not show progress spinner if personCollectionLoading false', () => {
    const listElement: HTMLElement = testHostFixture.nativeElement;
    testHostComponent.personCollectionLoading = false;
    const progressSpinner = listElement.querySelector(
      '.list__spinner--container'
    );
    expect(progressSpinner).toBeNull();
  });

  it('should show error message if isError true', () => {
    const listElement: HTMLElement = testHostFixture.nativeElement;
    testHostComponent.isError = true;
    const errorMessage = listElement.querySelector('.error');
    expect(errorMessage).toBeDefined();
  });

  it('should not show error message if isError false', () => {
    const listElement: HTMLElement = testHostFixture.nativeElement;
    testHostComponent.isError = false;
    const errorMessage = listElement.querySelector('.error');
    expect(errorMessage).toBeNull();
  });

  it('should contain mat table', () => {
    const listElement: HTMLElement = testHostFixture.nativeElement;
    const matTable = listElement.querySelector('mat-table');
    expect(matTable).toBeDefined();
  });

  it('should contain avatar, firstName, lastName in displayed columns', () => {
    expect(component.displayedColumns).toEqual([
      'avatar',
      'firstName',
      'lastName'
    ]);
  });

  it('should contain avatar column in table', () => {});

  it('should contain avatar image in given column in table', () => {});

  it('should contain first name column in table', () => {});

  it('should contain first name of person in given column in table', () => {});

  it('should contain last name column in table', () => {});

  it('should contain last name of person in given column in table', () => {});

  it('should emit person to parent when clicking on row', () => {
    let person: Person;
    const row = testHostFixture.debugElement.query(By.css('.mat-row'));
    expect(row).toBeDefined();
    component.openDetails.subscribe(val => (person = val));
    row.triggerEventHandler('click', null);
    expect(person).toBeDefined();
    expect(component.onOpenDetails).toHaveBeenCalledWith(person);
    expect(testHostComponent.onOpenDetails).toHaveBeenCalledWith(person);
  });

  it('should emit sort to parent when clicking on last name column in table', () => {
    let sort: Sort;
    const lastNameColumnHeader = testHostFixture.debugElement.query(
      By.css('.mat-column-lastName')
    );
    expect(lastNameColumnHeader).toBeDefined();
    component.sortData.subscribe(val => (sort = val));
    lastNameColumnHeader.triggerEventHandler('click', null);
    expect(sort).toBeDefined();
    expect(component.onSortData).toHaveBeenCalledWith(sort);
    expect(testHostComponent.onSortData).toHaveBeenCalledWith(sort);
  });

  it('should return valid result in trackByFn', () => {
    expect(component.trackByFn(0, { id: 1 } as Person)).toBe('01');
  });
});
