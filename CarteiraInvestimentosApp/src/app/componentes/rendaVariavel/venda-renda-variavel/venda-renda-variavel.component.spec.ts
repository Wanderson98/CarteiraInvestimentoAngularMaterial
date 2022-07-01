import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaRendaVariavelComponent } from './venda-renda-variavel.component';

describe('VendaRendaVariavelComponent', () => {
  let component: VendaRendaVariavelComponent;
  let fixture: ComponentFixture<VendaRendaVariavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendaRendaVariavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendaRendaVariavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
