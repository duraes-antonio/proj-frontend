import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TelaHistoricoCompraComponent} from './tela-historico-compra.component';

describe('TelaHistoricoCompraComponent', () => {
  let component: TelaHistoricoCompraComponent;
  let fixture: ComponentFixture<TelaHistoricoCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelaHistoricoCompraComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaHistoricoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
