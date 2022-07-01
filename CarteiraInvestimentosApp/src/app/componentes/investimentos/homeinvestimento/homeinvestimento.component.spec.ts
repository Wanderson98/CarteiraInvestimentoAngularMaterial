import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeinvestimentoComponent } from './homeinvestimento.component';

describe('HomeinvestimentoComponent', () => {
  let component: HomeinvestimentoComponent;
  let fixture: ComponentFixture<HomeinvestimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeinvestimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeinvestimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
