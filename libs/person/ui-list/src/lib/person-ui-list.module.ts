import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { MatListModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatListModule],
  declarations: [ListComponent],
  exports: [ListComponent]
})
export class PersonUiListModule {}
