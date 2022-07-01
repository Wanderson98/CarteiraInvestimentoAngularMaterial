import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemSimplesRendaVariavelComponent } from './listagem-simples-renda-variavel.component';

describe('ListagemSimplesRendaVariavelComponent', () => {
  let component: ListagemSimplesRendaVariavelComponent;
  let fixture: ComponentFixture<ListagemSimplesRendaVariavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemSimplesRendaVariavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemSimplesRendaVariavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
