import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TelaContatoComponent} from './tela-contato.component';

describe('TelaContatoComponent', () => {
  let component: TelaContatoComponent;
  let fixture: ComponentFixture<TelaContatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelaContatoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaContatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
