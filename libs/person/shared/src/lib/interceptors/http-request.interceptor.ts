import { Inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY_NAME, API_KEY_VALUE } from '@person/person/shared';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    @Inject(API_KEY_NAME) private apiKeyName: string,
    @Inject(API_KEY_VALUE) private apiKeyValue: string
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        [`${this.apiKeyName}`]: `${this.apiKeyValue}`
      }
    });
    return next.handle(request);
  }
}
