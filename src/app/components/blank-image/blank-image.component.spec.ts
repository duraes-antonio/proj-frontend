import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BlankImageComponent} from './blank-image.component';

describe('BlankImageComponent', () => {
  let component: BlankImageComponent;
  let fixture: ComponentFixture<BlankImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlankImageComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
