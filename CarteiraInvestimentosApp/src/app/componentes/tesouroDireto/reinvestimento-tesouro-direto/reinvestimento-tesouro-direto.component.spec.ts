import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinvestimentoTesouroDiretoComponent } from './reinvestimento-tesouro-direto.component';

describe('ReinvestimentoTesouroDiretoComponent', () => {
  let component: ReinvestimentoTesouroDiretoComponent;
  let fixture: ComponentFixture<ReinvestimentoTesouroDiretoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinvestimentoTesouroDiretoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReinvestimentoTesouroDiretoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
