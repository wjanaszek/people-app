import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Route[] = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'person',
        loadChildren: () =>
          import('libs/person/feature/src/lib/person-feature.module').then(
            m => m.PersonFeatureModule
          )
      },
      {
        path: 'specification',
        loadChildren: () =>
          import('libs/specification/src/lib/specification-feature.module').then(
            m => m.SpecificationModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {}
