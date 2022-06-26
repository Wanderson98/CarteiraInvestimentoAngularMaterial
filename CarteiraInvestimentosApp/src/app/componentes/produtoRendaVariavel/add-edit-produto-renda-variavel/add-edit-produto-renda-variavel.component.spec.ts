import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProdutoRendaVariavelComponent } from './add-edit-produto-renda-variavel.component';

describe('AddEditProdutoRendaVariavelComponent', () => {
  let component: AddEditProdutoRendaVariavelComponent;
  let fixture: ComponentFixture<AddEditProdutoRendaVariavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProdutoRendaVariavelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProdutoRendaVariavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
