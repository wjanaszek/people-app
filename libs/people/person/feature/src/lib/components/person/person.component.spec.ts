import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { PersonUiListModule } from '@people/person/ui-list';
import { PersonUiDetailsDialogModule } from '@people/person/ui-details-dialog';
import { MatButtonModule, MatDialog } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { PersonDataService } from '@people/person/data-access';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Person } from '@people/person/resource';
import SpyObj = jasmine.SpyObj;

class ActivatedRouteMock {
  params = of();
}

class DialogMock {
  open() {
    return {
      afterClosed: () => of()
    };
  }
}

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;
  let activatedRoute: SpyObj<ActivatedRoute>;
  let dialog: SpyObj<MatDialog>;
  let location: SpyObj<Location>;
  let personDataService: SpyObj<PersonDataService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        PersonUiListModule,
        PersonUiDetailsDialogModule,
        MatButtonModule,
        RouterTestingModule
      ],
      declarations: [PersonComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock
        },
        {
          provide: MatDialog,
          useClass: DialogMock
        },
        {
          provide: Location,
          useValue: jasmine.createSpyObj('location', ['replaceState'])
        },
        {
          provide: PersonDataService,
          useValue: jasmine.createSpyObj('personDataService', [
            'getPerson',
            'getPersonCollection'
          ])
        }
      ]
    }).compileComponents();

    activatedRoute = TestBed.get(ActivatedRoute);
    dialog = TestBed.get(MatDialog);
    location = TestBed.get(Location);
    personDataService = TestBed.get(PersonDataService);

    location.replaceState.and.callThrough();
    personDataService.getPerson.and.returnValue(of({}));
    personDataService.getPersonCollection.and.returnValue(of([]));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load person list', () => {
    component.ngOnInit();
    expect(personDataService.getPersonCollection).toHaveBeenCalledWith({
      overrideCache: false
    });
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

  it('should reload list after clicking a reload list button', () => {
    const reloadListButton = fixture.debugElement.query(
      By.css('.person-collection--reload__button')
    );
    expect(reloadListButton).toBeDefined();
    reloadListButton.triggerEventHandler('click', null);
    expect(personDataService.getPersonCollection).toHaveBeenCalledWith({
      overrideCache: true
    });
  });

  it('should open details dialog after clicking a row in person list', () => {
    spyOn(dialog, 'open').and.callThrough();
    component.onOpenDetails({ id: 1 } as Person);
    expect(dialog.open).toHaveBeenCalled();
  });

  it('should open details dialog after reading id from route params', () => {
    spyOn(dialog, 'open').and.callThrough();
    activatedRoute.params = of({ id: 1 });
    component.ngOnInit();
    expect(dialog.open).toHaveBeenCalled();
  });
});
