import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SliderBaseComponent} from './slider-base.component';

describe('SliderBaseComponent', () => {
  let component: SliderBaseComponent;
  let fixture: ComponentFixture<SliderBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SliderBaseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
