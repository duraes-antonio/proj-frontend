import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecupSenhaComponent } from './modal-recup-senha.component';

describe('ModalRecupSenhaComponent', () => {
  let component: ModalRecupSenhaComponent;
  let fixture: ComponentFixture<ModalRecupSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRecupSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecupSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
