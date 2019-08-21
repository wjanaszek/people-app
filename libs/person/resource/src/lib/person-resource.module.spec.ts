import { async, TestBed } from '@angular/core/testing';
import { PersonResourceModule } from './person-resource.module';

describe('PersonResourceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PersonResourceModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PersonResourceModule).toBeDefined();
  });
});
