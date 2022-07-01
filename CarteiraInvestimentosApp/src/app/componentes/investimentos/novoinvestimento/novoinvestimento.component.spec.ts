import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoinvestimentoComponent } from './novoinvestimento.component';

describe('NovoinvestimentoComponent', () => {
  let component: NovoinvestimentoComponent;
  let fixture: ComponentFixture<NovoinvestimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoinvestimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoinvestimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
