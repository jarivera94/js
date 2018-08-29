import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { formOpportunityComponent } from './formOpportunity.component';

describe('formOpportunityComponent', () => {
  let component: formOpportunityComponent;
  let fixture: ComponentFixture<formOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ formOpportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(formOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
