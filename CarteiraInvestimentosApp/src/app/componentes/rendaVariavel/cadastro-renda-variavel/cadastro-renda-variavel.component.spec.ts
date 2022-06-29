import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRendaVariavelComponent } from './cadastro-renda-variavel.component';

describe('CadastroRendaVariavelComponent', () => {
  let component: CadastroRendaVariavelComponent;
  let fixture: ComponentFixture<CadastroRendaVariavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroRendaVariavelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroRendaVariavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
