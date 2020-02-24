import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PaginaFundoComponent} from './pagina-fundo.component';

describe('PaginaFundoComponent', () => {
  let component: PaginaFundoComponent;
  let fixture: ComponentFixture<PaginaFundoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaFundoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaFundoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
