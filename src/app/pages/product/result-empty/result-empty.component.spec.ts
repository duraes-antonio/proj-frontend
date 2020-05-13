import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResultEmptyComponent} from './result-empty.component';

describe('ResultEmptyComponent', () => {
  let component: ResultEmptyComponent;
  let fixture: ComponentFixture<ResultEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultEmptyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
