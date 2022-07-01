import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemSimplesPoupancaComponent } from './listagem-simples-poupanca.component';

describe('ListagemSimplesPoupancaComponent', () => {
  let component: ListagemSimplesPoupancaComponent;
  let fixture: ComponentFixture<ListagemSimplesPoupancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemSimplesPoupancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemSimplesPoupancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
