import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalListSlideComponent} from './modal-list-slide.component';

describe('ModalListSlidesComponent', () => {
  let component: ModalListSlideComponent;
  let fixture: ComponentFixture<ModalListSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalListSlideComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalListSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
