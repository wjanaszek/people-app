import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  API_KEY_NAME,
  API_KEY_VALUE,
  API_URL,
  CACHE_TIME,
  HttpRequestInterceptor
} from '@people/person/shared';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app.routing-module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { PeopleSharedUiNavbarModule } from '@people/shared/ui-navbar';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    PeopleSharedUiNavbarModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: API_KEY_NAME,
      useValue: environment.apiKeyName
    },
    {
      provide: API_KEY_VALUE,
      useValue: environment.apiKeyValue
    },
    {
      provide: API_URL,
      useValue: environment.apiUrl
    },
    {
      provide: CACHE_TIME,
      useValue: environment.cacheTime
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
