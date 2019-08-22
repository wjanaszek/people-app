import { TestBed } from '@angular/core/testing';

import { PersonDataService } from './person-data.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Person } from '@person/person/resource';
import { CACHE_TIME, interpolateUrl } from '@person/person/shared';

describe('PersonDataService', () => {
  let service: PersonDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CACHE_TIME,
          useValue: 100
        }
      ]
    });

    service = TestBed.get(PersonDataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    service = TestBed.get(PersonDataService);
    expect(service).toBeTruthy();
  });

  describe('getPerson', () => {
    it('should return person data with given id', () => {
      const id = 1;
      const person = { id } as Person;

      service.getPerson({ id }).subscribe(res => {
        expect(res).toBe(person);
      });

      const req = httpMock.expectOne(
        interpolateUrl(service.endpoints.getPerson, ':id', id)
      );
      expect(req.request.method).toBe('GET');
      req.flush(person);
    });

    it('should throw error', () => {
      const id = 1;

      service.getPerson({ id }).subscribe(
        () => {
          fail('expected error');
        },
        err => {
          expect(err).toBeDefined();
        }
      );

      const req = httpMock.expectOne(
        interpolateUrl(service.endpoints.getPerson, ':id', id)
      );
      expect(req.request.method).toBe('GET');
      req.flush(null, { status: 404, statusText: 'Not found' });
    });
  });

  describe('getPersonCollection', () => {
    it('should return person collection from cache if no refresh time achieved', () => {
      const collection = [];
      service.cachedPersonCollection = collection;
      service.lastRequestTimestamp = 5;

      spyOn(Date, 'now').and.returnValue(10);

      service.getPersonCollection({ overrideCache: false }).subscribe(res => {
        expect(res).toBe(collection);
      });

      httpMock.expectNone(service.endpoints.getPersonCollection);
    });

    it('should return person collection from API if refresh time achieved', () => {
      const collection = [];

      service.lastRequestTimestamp = 0;

      spyOn(Date, 'now').and.returnValue(1000000);

      service.getPersonCollection({ overrideCache: false }).subscribe(res => {
        expect(res).toBe(collection);
      });

      const req = httpMock.expectOne(service.endpoints.getPersonCollection);
      expect(req.request.method).toBe('GET');
      req.flush(collection);
    });

    it('should return person collection from API if overrideCache is true', () => {
      const collection = [];

      service.getPersonCollection({ overrideCache: true }).subscribe(res => {
        expect(res).toBe(collection);
      });

      const req = httpMock.expectOne(service.endpoints.getPersonCollection);
      expect(req.request.method).toBe('GET');
      req.flush(collection);
    });

    it('should throw error', () => {
      service.getPersonCollection({} as any).subscribe(
        () => {
          fail('expected error');
        },
        err => {
          expect(err).toBeDefined();
        }
      );

      const req = httpMock.expectOne(service.endpoints.getPersonCollection);
      expect(req.request.method).toBe('GET');
      req.flush(null, { status: 404, statusText: 'Not found' });
    });
  });
});
