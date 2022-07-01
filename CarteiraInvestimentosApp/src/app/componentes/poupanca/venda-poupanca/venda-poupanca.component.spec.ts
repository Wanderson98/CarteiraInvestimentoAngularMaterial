import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaPoupancaComponent } from './venda-poupanca.component';

describe('VendaPoupancaComponent', () => {
  let component: VendaPoupancaComponent;
  let fixture: ComponentFixture<VendaPoupancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendaPoupancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendaPoupancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
