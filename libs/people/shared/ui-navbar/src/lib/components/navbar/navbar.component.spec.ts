import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatToolbarModule, RouterTestingModule],
      declarations: [NavbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain mat-toolbar', () => {
    const navbar: HTMLElement = fixture.nativeElement;
    const matToolbar = navbar.querySelector('mat-toolbar');
    expect(matToolbar).toBeDefined();
  });

  it('should contain router links to person and specification routes', () => {
    const navbar: HTMLElement = fixture.nativeElement;
    const routerLinkCollection = navbar.querySelectorAll('span');
    expect(routerLinkCollection.length).toBe(2);
    expect(routerLinkCollection[0].textContent).toBe('People app');
    expect(routerLinkCollection[1].textContent).toBe('Specification');
  });
});
