import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinvestimentoPoupancaComponent } from './reinvestimento-poupanca.component';

describe('ReinvestimentoPoupancaComponent', () => {
  let component: ReinvestimentoPoupancaComponent;
  let fixture: ComponentFixture<ReinvestimentoPoupancaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinvestimentoPoupancaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReinvestimentoPoupancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
