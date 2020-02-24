import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListaCartaoComponent} from './lista-cartao.component';

describe('ListaCartaoComponent', () => {
  let component: ListaCartaoComponent;
  let fixture: ComponentFixture<ListaCartaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCartaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
