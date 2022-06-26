import { TestBed } from '@angular/core/testing';

import { PoupancaService } from './poupanca.service';

describe('PoupancaService', () => {
  let service: PoupancaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoupancaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
