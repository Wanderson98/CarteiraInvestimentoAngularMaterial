import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPoupancaComponent } from './add-edit-poupanca.component';

describe('AddEditPoupancaComponent', () => {
  let component: AddEditPoupancaComponent;
  let fixture: ComponentFixture<AddEditPoupancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPoupancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPoupancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
