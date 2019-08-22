import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { API_KEY_NAME, API_KEY_VALUE, API_URL, CACHE_TIME, SharedModule } from '@people/person/shared';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app.routing-module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
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
    }
  ]
})
export class AppModule {}
