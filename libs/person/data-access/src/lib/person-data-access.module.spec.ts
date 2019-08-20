import { async, TestBed } from '@angular/core/testing';
import { PersonDataAccessModule } from './person-data-access.module';

describe('PersonDataAccessModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PersonDataAccessModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PersonDataAccessModule).toBeDefined();
  });
});
