import { TestBed } from '@angular/core/testing';

import { ProdutoRendaVariavelService } from './produto-renda-variavel.service';

describe('ProdutoRendaVariavelService', () => {
  let service: ProdutoRendaVariavelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoRendaVariavelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
