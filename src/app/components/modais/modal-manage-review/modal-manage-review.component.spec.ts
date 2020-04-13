import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalManageReviewComponent } from './modal-manage-review.component';

describe('ModalManageReviewComponent', () => {
  let component: ModalManageReviewComponent;
  let fixture: ComponentFixture<ModalManageReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalManageReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalManageReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
