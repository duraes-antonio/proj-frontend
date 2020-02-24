import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalMatComponent} from './modal-mat.component';

describe('ModalMatComponent', () => {
  let component: ModalMatComponent;
  let fixture: ComponentFixture<ModalMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMatComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
