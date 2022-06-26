import { TestBed } from '@angular/core/testing';

import { AtualizarRendaVariavelService } from './atualizar-renda-variavel.service';

describe('AtualizarRendaVariavelService', () => {
  let service: AtualizarRendaVariavelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtualizarRendaVariavelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
