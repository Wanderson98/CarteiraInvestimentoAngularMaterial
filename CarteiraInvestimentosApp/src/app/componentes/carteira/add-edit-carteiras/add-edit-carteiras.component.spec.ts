import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCarteirasComponent } from './add-edit-carteiras.component';

describe('AddEditCarteirasComponent', () => {
  let component: AddEditCarteirasComponent;
  let fixture: ComponentFixture<AddEditCarteirasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCarteirasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCarteirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
