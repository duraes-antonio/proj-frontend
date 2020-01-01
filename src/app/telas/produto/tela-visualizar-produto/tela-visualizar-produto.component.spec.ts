import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TelaVisualizarProdutoComponent} from './tela-visualizar-produto.component';

describe('TelaVisualizarProdutoComponent', () => {
  let component: TelaVisualizarProdutoComponent;
  let fixture: ComponentFixture<TelaVisualizarProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelaVisualizarProdutoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaVisualizarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
