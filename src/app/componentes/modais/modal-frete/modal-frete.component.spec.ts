import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalFreteComponent} from './modal-frete.component';

describe('ModalFreteComponent', () => {
  let component: ModalFreteComponent;
  let fixture: ComponentFixture<ModalFreteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFreteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
