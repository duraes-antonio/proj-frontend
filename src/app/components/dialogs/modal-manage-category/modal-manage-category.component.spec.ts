import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalManageCategoryComponent} from './modal-manage-category.component';

describe('ModalManageCategoryComponent', () => {
  let component: ModalManageCategoryComponent;
  let fixture: ComponentFixture<ModalManageCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalManageCategoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalManageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
