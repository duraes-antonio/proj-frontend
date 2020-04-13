import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormSignUpComponent} from './form-sign-up.component';

describe('FormCadClienteComponent', () => {
  let component: FormSignUpComponent;
  let fixture: ComponentFixture<FormSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSignUpComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
