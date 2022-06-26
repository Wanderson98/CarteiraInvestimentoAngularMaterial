import { TestBed } from '@angular/core/testing';

import { IndexadorService } from './indexador.service';

describe('IndexadorService', () => {
  let service: IndexadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
