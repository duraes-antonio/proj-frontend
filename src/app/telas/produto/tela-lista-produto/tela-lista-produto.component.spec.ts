import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TelaListaProdutoComponent} from './tela-lista-produto.component';

describe('TelaListaProdutoComponent', () => {
  let component: TelaListaProdutoComponent;
  let fixture: ComponentFixture<TelaListaProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelaListaProdutoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaListaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
