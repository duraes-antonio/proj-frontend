import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TelaRedefinirSenhaComponent} from './tela-redefinir-senha.component';

describe('TelaRedefinirSenhaComponent', () => {
  let component: TelaRedefinirSenhaComponent;
  let fixture: ComponentFixture<TelaRedefinirSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelaRedefinirSenhaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelaRedefinirSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
