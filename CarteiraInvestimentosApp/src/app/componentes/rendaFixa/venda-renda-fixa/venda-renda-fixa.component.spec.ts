import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaRendaFixaComponent } from './venda-renda-fixa.component';

describe('VendaRendaFixaComponent', () => {
  let component: VendaRendaFixaComponent;
  let fixture: ComponentFixture<VendaRendaFixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendaRendaFixaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendaRendaFixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
