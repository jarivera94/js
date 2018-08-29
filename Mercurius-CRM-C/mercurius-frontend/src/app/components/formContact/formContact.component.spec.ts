import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { formContactComponent } from './formContact.component';

describe('formContactComponent', () => {
  let component: formContactComponent;
  let fixture: ComponentFixture<formContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ formContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(formContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
