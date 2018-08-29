import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { formLeadComponent } from './formLead.component';

describe('formLeadComponent', () => {
  let component: formLeadComponent;
  let fixture: ComponentFixture<formLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ formLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(formLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
