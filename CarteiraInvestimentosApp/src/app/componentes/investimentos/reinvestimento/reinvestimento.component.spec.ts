import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinvestimentoComponent } from './reinvestimento.component';

describe('ReinvestimentoComponent', () => {
  let component: ReinvestimentoComponent;
  let fixture: ComponentFixture<ReinvestimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinvestimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReinvestimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
