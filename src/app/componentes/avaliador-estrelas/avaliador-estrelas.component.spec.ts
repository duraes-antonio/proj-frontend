import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AvaliadorEstrelasComponent} from './avaliador-estrelas.component';

describe('AvaliadorEstrelasComponent', () => {
  let component: AvaliadorEstrelasComponent;
  let fixture: ComponentFixture<AvaliadorEstrelasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvaliadorEstrelasComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliadorEstrelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
