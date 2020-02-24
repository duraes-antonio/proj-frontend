import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SequenciaComponent} from './sequencia.component';

describe('SequenciaComponent', () => {
  let component: SequenciaComponent;
  let fixture: ComponentFixture<SequenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
