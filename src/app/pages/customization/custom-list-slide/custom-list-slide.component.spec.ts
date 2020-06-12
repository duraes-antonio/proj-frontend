import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomListSlideComponent} from './custom-list-slide.component';

describe('CustomListSlideComponent', () => {
  let component: CustomListSlideComponent;
  let fixture: ComponentFixture<CustomListSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CustomListSlideComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomListSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
