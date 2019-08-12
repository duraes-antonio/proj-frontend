import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeqLojaComponent } from './seq-loja.component';

describe('SeqLojaComponent', () => {
  let component: SeqLojaComponent;
  let fixture: ComponentFixture<SeqLojaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeqLojaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeqLojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
