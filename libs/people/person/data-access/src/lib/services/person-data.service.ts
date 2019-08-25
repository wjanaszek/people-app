import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, CACHE_TIME, interpolateUrl } from '@people/person/shared';
import { Observable, of } from 'rxjs';
import {
  Person,
  PERSON_COLLECTION_MOCK_DATA,
  PERSON_DETAILS_MOCK_DATA
} from '@people/person/resource';
import { GetPersonRequestPayload } from '../resources/request-payloads/get-person.request-payload';
import { GetPersonCollectionRequestPayload } from '../resources/request-payloads/get-person-collection.request-payload';
import { delay, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonDataService {
  readonly endpoints = {
    getPerson: this.apiUrl + '/people/:id',
    getPersonCollection: this.apiUrl + '/people'
  };

  lastRequestTimestamp: number;
  cachedPersonCollection = [];

  constructor(
    private http: HttpClient,
    @Optional() @Inject(API_URL) private apiUrl = '',
    @Optional() @Inject(CACHE_TIME) private cacheTime = 0
  ) {}

  getPerson(payload: GetPersonRequestPayload): Observable<Person> {
    // return of(PERSON_DETAILS_MOCK_DATA).pipe(delay(500));
    return this.http.get<Person>(
      interpolateUrl(this.endpoints.getPerson, ':id', payload.id)
    );
  }

  getPersonCollection(
    payload: GetPersonCollectionRequestPayload
  ): Observable<Person[]> {
    // return of(PERSON_COLLECTION_MOCK_DATA).pipe(delay(500));
    return payload.overrideCache ||
      !this.lastRequestTimestamp ||
      Date.now() - this.lastRequestTimestamp > this.cacheTime
      ? this.http
          .get<Person[]>(this.endpoints.getPersonCollection)
          .pipe(tap(data => (this.cachedPersonCollection = data)))
      : of(this.cachedPersonCollection);
  }
}
