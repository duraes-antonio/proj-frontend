import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalShippingMatComponent} from './modal-shipping-mat.component';

describe('ModalShippingMatComponent', () => {
  let component: ModalShippingMatComponent;
  let fixture: ComponentFixture<ModalShippingMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalShippingMatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShippingMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
