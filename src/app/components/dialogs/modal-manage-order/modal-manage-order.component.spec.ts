import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalManageOrderComponent} from './modal-manage-order.component';

describe('ModalManageOrderComponent', () => {
  let component: ModalManageOrderComponent;
  let fixture: ComponentFixture<ModalManageOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalManageOrderComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalManageOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
