import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: 'person',
    loadChildren: () =>
      import('@people/person/feature').then(m => m.PersonFeatureModule)
  },
  {
    path: 'specification',
    loadChildren: () =>
      import('@people/specification/feature').then(
        m => m.SpecificationFeatureModule
      )
  },
  {
    path: '',
    redirectTo: 'person',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
