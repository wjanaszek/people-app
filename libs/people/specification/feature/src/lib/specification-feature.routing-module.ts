import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SpecificationComponent } from './components/specification/specification.component';

const routes: Route[] = [
  {
    path: '',
    component: SpecificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class SpecificationFeatureRoutingModule {}
