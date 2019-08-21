import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { MatListModule, MatProgressSpinnerModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatListModule, MatProgressSpinnerModule],
  declarations: [ListComponent],
  exports: [ListComponent]
})
export class PersonUiListModule {}
