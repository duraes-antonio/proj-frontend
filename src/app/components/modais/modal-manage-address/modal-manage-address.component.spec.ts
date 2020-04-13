import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalManageAddressComponent} from './modal-manage-address.component';

describe('ModalCreateAddressComponent', () => {
  let component: ModalManageAddressComponent;
  let fixture: ComponentFixture<ModalManageAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalManageAddressComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalManageAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
