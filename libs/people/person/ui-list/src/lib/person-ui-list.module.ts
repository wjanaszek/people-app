import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { MatProgressSpinnerModule, MatSortModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatTableModule, MatSortModule, MatProgressSpinnerModule],
  declarations: [ListComponent],
  exports: [ListComponent]
})
export class PersonUiListModule {}
