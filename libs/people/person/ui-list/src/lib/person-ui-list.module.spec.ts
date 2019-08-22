import { async, TestBed } from '@angular/core/testing';
import { PersonUiListModule } from './person-ui-list.module';

describe('PersonUiListModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PersonUiListModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PersonUiListModule).toBeDefined();
  });
});
