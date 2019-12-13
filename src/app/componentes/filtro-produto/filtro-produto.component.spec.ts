import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FiltroProdutoComponent} from './filtro-produto.component';

describe('FiltroProdutoComponent', () => {
  let component: FiltroProdutoComponent;
  let fixture: ComponentFixture<FiltroProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiltroProdutoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
