import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { PersonUiListModule } from '@people/person/ui-list';
import { PersonUiDetailsDialogModule } from '@people/person/ui-details-dialog';
import { MatButtonModule, MatDialog } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { PersonDataAccessModule } from '@people/person/data-access';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import SpyObj = jasmine.SpyObj;
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  let activatedRoute: SpyObj<ActivatedRoute>;
  let dialog: SpyObj<MatDialog>;
  let location: SpyObj<Location>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        PersonDataAccessModule,
        PersonUiListModule,
        PersonUiDetailsDialogModule,
        MatButtonModule,
        RouterTestingModule
      ],
      declarations: [PersonComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: jasmine.createSpyObj('activatedRoute', ['params'])
        },
        {
          provide: MatDialog,
          useValue: jasmine.createSpyObj('dialog', ['open'])
        },
        {
          provide: Location,
          useValue: jasmine.createSpyObj('location', ['replaceState'])
        }
      ]
    }).compileComponents();

    activatedRoute = TestBed.get(ActivatedRoute);
    dialog = TestBed.get(MatDialog);
    location = TestBed.get(Location);

    dialog.open.and.returnValue(of(true));
    location.replaceState.and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain reload person list button', () => {
    const reloadListButton = fixture.debugElement.query(
      By.css('.person-collection--reload__button')
    );
    expect(reloadListButton).toBeDefined();
    expect(reloadListButton.nativeElement.innerText).toBe('RELOAD LIST');
  });

  it('should disable reload list button if personCollectionLoading is true', () => {
    component.personCollectionLoading = true;
    fixture.detectChanges();

    const reloadListButton = fixture.debugElement.query(
      By.css('.person-collection--reload__button')
    );
    expect(reloadListButton).toBeDefined();
    expect(reloadListButton.attributes.disabled).toBe('true');
  });

  it('should open details dialog', () => {
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should open details dialog after reading id from route params', () => {});
});
