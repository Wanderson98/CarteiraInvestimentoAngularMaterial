import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProdutoRendaFixaComponent } from './add-edit-produto-renda-fixa.component';

describe('AddEditProdutoRendaFixaComponent', () => {
  let component: AddEditProdutoRendaFixaComponent;
  let fixture: ComponentFixture<AddEditProdutoRendaFixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditProdutoRendaFixaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditProdutoRendaFixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
