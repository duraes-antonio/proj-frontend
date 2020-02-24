import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TelaSobreComponent} from './tela-sobre.component';

describe('TelaSobreComponent', () => {
  let component: TelaSobreComponent;
  let fixture: ComponentFixture<TelaSobreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelaSobreComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaSobreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
