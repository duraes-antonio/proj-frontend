import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SliderMarketComponent} from './slider-market.component';

describe('SeqLojaComponent', () => {
  let component: SliderMarketComponent;
  let fixture: ComponentFixture<SliderMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SliderMarketComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
