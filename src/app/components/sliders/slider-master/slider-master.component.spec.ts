import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SliderMasterComponent} from './slider-master.component';

describe('SliderComponent', () => {
  let component: SliderMasterComponent;
  let fixture: ComponentFixture<SliderMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SliderMasterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
