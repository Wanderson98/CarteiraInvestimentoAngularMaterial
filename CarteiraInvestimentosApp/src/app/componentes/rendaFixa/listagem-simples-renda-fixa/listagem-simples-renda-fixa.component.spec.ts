import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemSimplesRendaFixaComponent } from './listagem-simples-renda-fixa.component';

describe('ListagemSimplesRendaFixaComponent', () => {
  let component: ListagemSimplesRendaFixaComponent;
  let fixture: ComponentFixture<ListagemSimplesRendaFixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemSimplesRendaFixaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemSimplesRendaFixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
