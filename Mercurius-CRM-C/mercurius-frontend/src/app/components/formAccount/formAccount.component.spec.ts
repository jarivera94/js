import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { formAccountComponent } from './formAccount.component';

describe('formAccountComponent', () => {
  let component: formAccountComponent;
  let fixture: ComponentFixture<formAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ formAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(formAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
