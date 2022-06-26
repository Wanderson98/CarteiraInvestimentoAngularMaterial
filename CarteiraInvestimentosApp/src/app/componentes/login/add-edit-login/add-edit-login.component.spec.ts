import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLoginComponent } from './add-edit-login.component';

describe('AddEditLoginComponent', () => {
  let component: AddEditLoginComponent;
  let fixture: ComponentFixture<AddEditLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
