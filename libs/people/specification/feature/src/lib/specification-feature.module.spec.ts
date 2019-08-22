import { async, TestBed } from '@angular/core/testing';
import { SpecificationFeatureModule } from './specification-feature.module';

describe('SpecificationFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpecificationFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SpecificationFeatureModule).toBeDefined();
  });
});
