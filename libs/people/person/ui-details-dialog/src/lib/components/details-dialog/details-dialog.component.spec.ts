import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDialogComponent } from './details-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
  MatProgressSpinnerModule
} from '@angular/material';
import { ChangeDetectorRef } from '@angular/core';
import { By, DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { of } from 'rxjs';
import {
  PERSON_DETAILS_MOCK_DATA,
  PersonHelper
} from '@people/person/resource';
import SpyObj = jasmine.SpyObj;

describe('DetailsDialogComponent', () => {
  let component: DetailsDialogComponent;
  let fixture: ComponentFixture<DetailsDialogComponent>;
  let dialogRef: SpyObj<MatDialogRef<DetailsDialogComponent>>;
  let changeDetectorRef: SpyObj<ChangeDetectorRef>;
  let sanitizer: SpyObj<DomSanitizer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, MatProgressSpinnerModule],
      declarations: [DetailsDialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('dialogRef', ['close'])
        },
        {
          provide: ChangeDetectorRef,
          useValue: jasmine.createSpyObj('changeDetectorRef', ['markForCheck'])
        },
        {
          provide: DomSanitizer,
          useValue: jasmine.createSpyObj('sanitizer', [
            'bypassSecurityTrustStyle',
            'sanitize'
          ])
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { person$: of(PERSON_DETAILS_MOCK_DATA) }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialogRef = TestBed.get(MatDialogRef);
    changeDetectorRef = TestBed.get(ChangeDetectorRef);
    sanitizer = TestBed.get(DomSanitizer);

    dialogRef.close.and.callThrough();
    changeDetectorRef.markForCheck.and.callThrough();
    sanitizer.sanitize.and.returnValue('');
    sanitizer.bypassSecurityTrustStyle.and.returnValue({} as SafeStyle);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title', () => {
    expect(fixture.nativeElement.querySelector('h1')).toBeDefined();
  });

  it('should show spinner when personLoading is true', () => {
    component.personLoading = true;

    component.changeDetectorRef.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.details-dialog--container')
    ).toBeNull();
    expect(fixture.nativeElement.querySelector('.error')).toBeNull();
    expect(
      fixture.nativeElement.querySelector('.details-dialog--spinner-container')
    ).toBeDefined();
  });

  it('should show person details when personLoading is false and no error occured', () => {
    component.personLoading = false;
    expect(
      fixture.nativeElement.querySelector('.details-dialog--container')
    ).toBeDefined();
    expect(fixture.nativeElement.querySelector('.error')).toBeNull();
    expect(
      fixture.nativeElement.querySelector('.details-dialog--spinner-container')
    ).toBeNull();
  });

  it('should show error message when personLoading is false and isError is true', () => {
    component.isError = true;
    component.personLoading = false;

    component.changeDetectorRef.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.details-dialog--container')
    ).toBeNull();
    expect(fixture.nativeElement.querySelector('.error')).toBeDefined();
    expect(
      fixture.nativeElement.querySelector('.details-dialog--spinner-container')
    ).toBeNull();
  });

  it('should contain close dialog button', () => {
    expect(
      fixture.nativeElement.querySelector(
        '.details-dialog--actions-close-button'
      )
    ).toBeDefined();
  });

  it('should close dialog after clicking close dialog button', () => {
    const closeDialogButton = fixture.debugElement.query(
      By.css('.details-dialog--actions-close-button')
    );
    expect(closeDialogButton).toBeDefined();
    closeDialogButton.triggerEventHandler('click', null);
    expect(dialogRef.close).toHaveBeenCalled();
  });

  it('should display person avatar', () => {
    component.personLoading = false;

    const personAvatar = fixture.debugElement.query(
      By.css('.details-dialog--container__avatar > img')
    );

    expect(personAvatar).toBeDefined();
  });

  it('should display person ID, full name and age', () => {
    component.personLoading = false;

    const personDetails = fixture.debugElement.queryAll(
      By.css('.details-dialog--container__info-fields > span')
    );
    expect(personDetails.length).toBe(3);
    expect(personDetails[0].nativeElement.innerText).toBe(
      `ID: ${PERSON_DETAILS_MOCK_DATA.id}`
    );
    expect(personDetails[1].nativeElement.innerText).toBe(
      `Full name: ${PersonHelper.getFullName(PERSON_DETAILS_MOCK_DATA)}`
    );
    expect(personDetails[2].nativeElement.innerText).toBe(
      `Age: ${PERSON_DETAILS_MOCK_DATA.age}`
    );
  });
});
