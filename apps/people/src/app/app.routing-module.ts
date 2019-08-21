import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  {
    path: 'person',
    loadChildren: () =>
      import('@person/person/feature').then(m => m.PersonFeatureModule)
  },
  {
    path: 'specification',
    loadChildren: () =>
      import('@person/specification/feature').then(
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
