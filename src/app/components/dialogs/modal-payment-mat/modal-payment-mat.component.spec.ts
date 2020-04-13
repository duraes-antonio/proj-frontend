import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalPaymentMatComponent} from './modal-payment-mat.component';

describe('ModalPaymentMatComponent', () => {
  let component: ModalPaymentMatComponent;
  let fixture: ComponentFixture<ModalPaymentMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPaymentMatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPaymentMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
