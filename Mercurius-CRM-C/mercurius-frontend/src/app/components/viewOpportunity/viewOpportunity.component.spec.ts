import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { viewOpportunityComponent } from './viewOpportunity.component';

describe('viewOpportunityComponent', () => {
  let component: viewOpportunityComponent;
  let fixture: ComponentFixture<viewOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ viewOpportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(viewOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
