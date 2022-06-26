import { TestBed } from '@angular/core/testing';

import { TesouroDiretoService } from './tesouro-direto.service';

describe('TesouroDiretoService', () => {
  let service: TesouroDiretoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesouroDiretoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
