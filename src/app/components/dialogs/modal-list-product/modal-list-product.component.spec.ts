import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalListProductComponent} from './modal-list-product.component';

describe('ModalListProductComponent', () => {
  let component: ModalListProductComponent;
  let fixture: ComponentFixture<ModalListProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalListProductComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
