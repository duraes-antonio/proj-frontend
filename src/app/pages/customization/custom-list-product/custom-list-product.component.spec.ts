import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomListProductComponent} from './custom-list-product.component';

describe('CustomListProductComponent', () => {
  let component: CustomListProductComponent;
  let fixture: ComponentFixture<CustomListProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomListProductComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
