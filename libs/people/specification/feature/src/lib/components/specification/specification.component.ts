import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'peo-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecificationComponent {}
