import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinvestimentoRendaVariavelComponent } from './reinvestimento-renda-variavel.component';

describe('ReinvestimentoRendaVariavelComponent', () => {
  let component: ReinvestimentoRendaVariavelComponent;
  let fixture: ComponentFixture<ReinvestimentoRendaVariavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinvestimentoRendaVariavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReinvestimentoRendaVariavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
