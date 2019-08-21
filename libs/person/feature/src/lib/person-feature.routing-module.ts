import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PersonComponent } from './components/person/person.component';

const routes: Route[] = [
  {
    path: ':id',
    component: PersonComponent
  },
  {
    path: '',
    component: PersonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class PersonFeatureRoutingModule {}
