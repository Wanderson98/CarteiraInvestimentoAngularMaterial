import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCarteirasComponent } from './list-carteiras.component';

describe('ListCarteirasComponent', () => {
  let component: ListCarteirasComponent;
  let fixture: ComponentFixture<ListCarteirasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCarteirasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCarteirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
