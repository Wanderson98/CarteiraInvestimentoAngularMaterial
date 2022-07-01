import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemSimplesTesouroDiretoComponent } from './listagem-simples-tesouro-direto.component';

describe('ListagemSimplesTesouroDiretoComponent', () => {
  let component: ListagemSimplesTesouroDiretoComponent;
  let fixture: ComponentFixture<ListagemSimplesTesouroDiretoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemSimplesTesouroDiretoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemSimplesTesouroDiretoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
