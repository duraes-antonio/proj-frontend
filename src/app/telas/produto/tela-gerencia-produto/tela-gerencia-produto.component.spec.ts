import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TelaGerenciaProdutoComponent} from './tela-gerencia-produto.component';

describe('TelaGerenciaProdutoComponent', () => {
  let component: TelaGerenciaProdutoComponent;
  let fixture: ComponentFixture<TelaGerenciaProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelaGerenciaProdutoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaGerenciaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
