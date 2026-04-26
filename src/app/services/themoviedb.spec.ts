import { TestBed } from '@angular/core/testing';

import { Themoviedb } from './themoviedb';

describe('Themoviedb', () => {
  let service: Themoviedb;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Themoviedb);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
