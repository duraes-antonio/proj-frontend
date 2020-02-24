import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListaAvaliacoesComponent} from './lista-avaliacoes.component';

describe('ListaAvaliacoesComponent', () => {
  let component: ListaAvaliacoesComponent;
  let fixture: ComponentFixture<ListaAvaliacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAvaliacoesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAvaliacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
