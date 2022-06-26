import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBancoComponent } from './add-edit-banco.component';

describe('AddEditBancoComponent', () => {
  let component: AddEditBancoComponent;
  let fixture: ComponentFixture<AddEditBancoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBancoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
