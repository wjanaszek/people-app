import { async, TestBed } from '@angular/core/testing';
import { PersonSharedModule } from './person-shared.module';

describe('PersonSharedModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PersonSharedModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PersonSharedModule).toBeDefined();
  });
});
