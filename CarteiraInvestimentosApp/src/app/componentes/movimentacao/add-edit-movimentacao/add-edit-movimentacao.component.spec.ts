import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMovimentacaoComponent } from './add-edit-movimentacao.component';

describe('AddEditMovimentacaoComponent', () => {
  let component: AddEditMovimentacaoComponent;
  let fixture: ComponentFixture<AddEditMovimentacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMovimentacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMovimentacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
