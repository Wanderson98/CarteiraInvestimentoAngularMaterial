import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRendaFixaComponent } from './list-renda-fixa.component';

describe('ListRendaFixaComponent', () => {
  let component: ListRendaFixaComponent;
  let fixture: ComponentFixture<ListRendaFixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRendaFixaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRendaFixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
