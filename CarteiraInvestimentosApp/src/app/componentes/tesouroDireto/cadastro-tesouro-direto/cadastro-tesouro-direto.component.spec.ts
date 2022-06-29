import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroTesouroDiretoComponent } from './cadastro-tesouro-direto.component';

describe('CadastroTesouroDiretoComponent', () => {
  let component: CadastroTesouroDiretoComponent;
  let fixture: ComponentFixture<CadastroTesouroDiretoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroTesouroDiretoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroTesouroDiretoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
