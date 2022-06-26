import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditIndexadorRendimentosComponent } from './add-edit-indexador-rendimentos.component';

describe('AddEditIndexadorRendimentosComponent', () => {
  let component: AddEditIndexadorRendimentosComponent;
  let fixture: ComponentFixture<AddEditIndexadorRendimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditIndexadorRendimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditIndexadorRendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
