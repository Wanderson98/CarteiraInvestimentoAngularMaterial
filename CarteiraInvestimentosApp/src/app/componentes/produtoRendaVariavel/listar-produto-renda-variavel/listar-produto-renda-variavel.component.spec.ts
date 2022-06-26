import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProdutoRendaVariavelComponent } from './listar-produto-renda-variavel.component';

describe('ListarProdutoRendaVariavelComponent', () => {
  let component: ListarProdutoRendaVariavelComponent;
  let fixture: ComponentFixture<ListarProdutoRendaVariavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProdutoRendaVariavelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProdutoRendaVariavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
