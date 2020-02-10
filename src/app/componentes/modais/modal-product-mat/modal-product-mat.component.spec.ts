import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalProductMatComponent} from './modal-product-mat.component';

describe('ModalProductMatComponent', () => {
  let component: ModalProductMatComponent;
  let fixture: ComponentFixture<ModalProductMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalProductMatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProductMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
