import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRendaFixaComponent } from './add-edit-renda-fixa.component';

describe('AddEditRendaFixaComponent', () => {
  let component: AddEditRendaFixaComponent;
  let fixture: ComponentFixture<AddEditRendaFixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditRendaFixaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditRendaFixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
