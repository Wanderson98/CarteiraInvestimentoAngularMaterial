import { TestBed } from '@angular/core/testing';

import { ProdutoRendaFixaService } from './produto-renda-fixa.service';

describe('ProdutoRendaFixaService', () => {
  let service: ProdutoRendaFixaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoRendaFixaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
