import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRendaVariavelComponent } from './list-renda-variavel.component';

describe('ListRendaVariavelComponent', () => {
  let component: ListRendaVariavelComponent;
  let fixture: ComponentFixture<ListRendaVariavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRendaVariavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRendaVariavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
