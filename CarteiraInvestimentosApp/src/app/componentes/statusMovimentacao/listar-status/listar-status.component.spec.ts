import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarStatusComponent } from './listar-status.component';

describe('ListarStatusComponent', () => {
  let component: ListarStatusComponent;
  let fixture: ComponentFixture<ListarStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
