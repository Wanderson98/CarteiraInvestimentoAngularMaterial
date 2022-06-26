import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProdutoRendaFixaComponent } from './listar-produto-renda-fixa.component';

describe('ListarProdutoRendaFixaComponent', () => {
  let component: ListarProdutoRendaFixaComponent;
  let fixture: ComponentFixture<ListarProdutoRendaFixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProdutoRendaFixaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarProdutoRendaFixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
