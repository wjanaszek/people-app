import { async, TestBed } from '@angular/core/testing';
import { PersonFeatureModule } from './person-feature.module';

describe('PersonFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PersonFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PersonFeatureModule).toBeDefined();
  });
});
