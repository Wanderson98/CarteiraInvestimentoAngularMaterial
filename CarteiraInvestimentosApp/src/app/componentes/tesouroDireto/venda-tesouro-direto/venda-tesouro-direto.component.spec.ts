import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendaTesouroDiretoComponent } from './venda-tesouro-direto.component';

describe('VendaTesouroDiretoComponent', () => {
  let component: VendaTesouroDiretoComponent;
  let fixture: ComponentFixture<VendaTesouroDiretoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendaTesouroDiretoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendaTesouroDiretoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
