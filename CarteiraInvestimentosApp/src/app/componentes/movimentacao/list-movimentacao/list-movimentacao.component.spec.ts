import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMovimentacaoComponent } from './list-movimentacao.component';

describe('ListMovimentacaoComponent', () => {
  let component: ListMovimentacaoComponent;
  let fixture: ComponentFixture<ListMovimentacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMovimentacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
