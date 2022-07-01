import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoExclusaoComponent } from './dialogo-exclusao.component';

describe('DialogoExclusaoComponent', () => {
  let component: DialogoExclusaoComponent;
  let fixture: ComponentFixture<DialogoExclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoExclusaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogoExclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
