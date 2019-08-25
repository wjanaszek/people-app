import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonUiListModule } from '@people/person/ui-list';
import { PersonUiDetailsDialogModule } from '@people/person/ui-details-dialog';
import { PersonComponent } from './components/person/person.component';
import { PersonFeatureRoutingModule } from './person-feature.routing-module';
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { PersonDataAccessModule } from '@people/person/data-access';
import { PersonSharedModule } from '@people/person/shared';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatProgressSpinnerModule,
    PersonDataAccessModule,
    PersonUiListModule,
    PersonUiDetailsDialogModule,
    PersonFeatureRoutingModule,
    PersonSharedModule
  ],
  declarations: [PersonComponent]
})
export class PersonFeatureModule {}
