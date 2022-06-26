import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTesouroDiretoComponent } from './add-edit-tesouro-direto.component';

describe('AddEditTesouroDiretoComponent', () => {
  let component: AddEditTesouroDiretoComponent;
  let fixture: ComponentFixture<AddEditTesouroDiretoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTesouroDiretoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTesouroDiretoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
