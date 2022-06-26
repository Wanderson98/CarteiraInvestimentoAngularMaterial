import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRendaVariavelComponent } from './add-edit-renda-variavel.component';

describe('AddEditRendaVariavelComponent', () => {
  let component: AddEditRendaVariavelComponent;
  let fixture: ComponentFixture<AddEditRendaVariavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRendaVariavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditRendaVariavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
