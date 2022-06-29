import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRendaFixaComponent } from './cadastro-renda-fixa.component';

describe('CadastroRendaFixaComponent', () => {
  let component: CadastroRendaFixaComponent;
  let fixture: ComponentFixture<CadastroRendaFixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroRendaFixaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroRendaFixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
