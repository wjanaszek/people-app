import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonUiListModule } from '@person/person/ui-list';
import { PersonUiDetailsDialogModule } from '@person/person/ui-details-dialog';
import { PersonComponent } from './components/person/person.component';
import { PersonFeatureRoutingModule } from './person-feature.routing-module';
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatProgressSpinnerModule,
    PersonUiListModule,
    PersonUiDetailsDialogModule,
    PersonFeatureRoutingModule
  ],
  declarations: [PersonComponent]
})
export class PersonFeatureModule {}
