import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTesouroDiretoComponent } from './list-tesouro-direto.component';

describe('ListTesouroDiretoComponent', () => {
  let component: ListTesouroDiretoComponent;
  let fixture: ComponentFixture<ListTesouroDiretoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTesouroDiretoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTesouroDiretoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
