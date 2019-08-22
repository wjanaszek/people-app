import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, MatToolbarModule, RouterModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class PeopleSharedUiNavbarModule {}
