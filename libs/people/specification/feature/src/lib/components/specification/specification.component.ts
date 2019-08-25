import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'peo-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecificationComponent {
  @ViewChild('dataAccessLib', { static: true })
  dataAccessLib: HTMLElement;
  @ViewChild('personDetailsDialogComponent', { static: true })
  personDetailsDialogComponent: HTMLElement;
  @ViewChild('personLib', { static: true })
  personLib: HTMLElement;
  @ViewChild('personListComponent', { static: true })
  personListComponent: HTMLElement;
  @ViewChild('projectStructure', { static: true })
  projectStructure: HTMLElement;
  @ViewChild('sharedLib', { static: true })
  sharedLib: HTMLElement;
  @ViewChild('specificationLib', { static: true })
  specificationLib: HTMLElement;
  @ViewChild('styles', { static: true })
  styles: HTMLElement;

  scrollToElement(element?: HTMLElement): void {
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}
