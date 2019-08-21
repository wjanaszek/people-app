import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { DetailsDialogComponent } from './components/details-dialog/details-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [DetailsDialogComponent],
  exports: [DetailsDialogComponent]
})
export class PersonUiDetailsDialogModule {}
