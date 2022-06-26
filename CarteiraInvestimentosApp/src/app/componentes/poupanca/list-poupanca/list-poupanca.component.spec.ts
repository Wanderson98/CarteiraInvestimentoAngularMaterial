import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPoupancaComponent } from './list-poupanca.component';

describe('ListPoupancaComponent', () => {
  let component: ListPoupancaComponent;
  let fixture: ComponentFixture<ListPoupancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPoupancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPoupancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
