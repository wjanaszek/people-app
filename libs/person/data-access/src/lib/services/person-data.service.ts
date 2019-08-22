import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, CACHE_TIME, interpolateUrl } from '@person/person/shared';
import { Observable, of } from 'rxjs';
import { Person } from '@person/person/resource';
import { GetPersonRequestPayload } from '../resources/request-payloads/get-person.request-payload';
import { GetPersonCollectionRequestPayload } from '../resources/request-payloads/get-person-collection.request-payload';

@Injectable({
  providedIn: 'root'
})
export class PersonDataService {
  readonly endpoints = {
    getPerson: this.apiUrl + '/person/:id',
    getPersonCollection: this.apiUrl + '/person'
  };

  lastRequestTimestamp: number;
  cachedPersonCollection = [];

  constructor(
    private http: HttpClient,
    @Optional() @Inject(API_URL) private apiUrl = '',
    @Optional() @Inject(CACHE_TIME) private cacheTime = 0
  ) {}

  getPerson(payload: GetPersonRequestPayload): Observable<Person> {
    return this.http.get<Person>(
      interpolateUrl(this.endpoints.getPerson, ':id', payload.id)
    );
  }

  getPersonCollection(
    payload: GetPersonCollectionRequestPayload
  ): Observable<Person[]> {
    return payload.overrideCache ||
      !this.lastRequestTimestamp ||
      Date.now() - this.lastRequestTimestamp > this.cacheTime
      ? this.http.get<Person[]>(this.endpoints.getPersonCollection)
      : of(this.cachedPersonCollection);
  }
}
