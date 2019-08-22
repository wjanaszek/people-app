import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecificationComponent } from './components/specification/specification.component';
import { SpecificationFeatureRoutingModule } from './specification-feature.routing-module';

@NgModule({
  imports: [CommonModule, SpecificationFeatureRoutingModule],
  declarations: [SpecificationComponent]
})
export class SpecificationFeatureModule {}
