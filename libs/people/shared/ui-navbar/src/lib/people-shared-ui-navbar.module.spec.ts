import { async, TestBed } from '@angular/core/testing';
import { PeopleSharedUiNavbarModule } from './people-shared-ui-navbar.module';

describe('PeopleSharedUiNavbarModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PeopleSharedUiNavbarModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PeopleSharedUiNavbarModule).toBeDefined();
  });
});
