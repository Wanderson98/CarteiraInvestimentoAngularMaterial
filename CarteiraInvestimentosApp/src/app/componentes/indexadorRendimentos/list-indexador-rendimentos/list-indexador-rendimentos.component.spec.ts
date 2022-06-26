import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIndexadorRendimentosComponent } from './list-indexador-rendimentos.component';

describe('ListIndexadorRendimentosComponent', () => {
  let component: ListIndexadorRendimentosComponent;
  let fixture: ComponentFixture<ListIndexadorRendimentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListIndexadorRendimentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIndexadorRendimentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
