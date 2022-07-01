import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinvestimentoRendaFixaComponent } from './reinvestimento-renda-fixa.component';

describe('ReinvestimentoRendaFixaComponent', () => {
  let component: ReinvestimentoRendaFixaComponent;
  let fixture: ComponentFixture<ReinvestimentoRendaFixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinvestimentoRendaFixaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReinvestimentoRendaFixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
