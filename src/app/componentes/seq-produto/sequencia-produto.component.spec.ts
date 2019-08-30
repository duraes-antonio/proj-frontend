import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenciaProdutoComponent } from './sequencia-produto.component';

describe('SequenciaProdutoComponent', () => {
  let component: SequenciaProdutoComponent;
  let fixture: ComponentFixture<SequenciaProdutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SequenciaProdutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenciaProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
