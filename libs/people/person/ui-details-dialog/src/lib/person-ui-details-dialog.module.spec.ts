import { async, TestBed } from '@angular/core/testing';
import { PersonUiDetailsDialogModule } from './person-ui-details-dialog.module';

describe('PersonUiDetailsDialogModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PersonUiDetailsDialogModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PersonUiDetailsDialogModule).toBeDefined();
  });
});
