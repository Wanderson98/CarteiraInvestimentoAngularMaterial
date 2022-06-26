import { TestBed } from '@angular/core/testing';

import { StatusMovimentacaoService } from './status-movimentacao.service';

describe('StatusMovimentacaoService', () => {
  let service: StatusMovimentacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusMovimentacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
