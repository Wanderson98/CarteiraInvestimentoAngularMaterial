import { TestBed } from '@angular/core/testing';

import { RendaVariavelService } from './renda-variavel.service';

describe('RendaVariavelService', () => {
  let service: RendaVariavelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RendaVariavelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
