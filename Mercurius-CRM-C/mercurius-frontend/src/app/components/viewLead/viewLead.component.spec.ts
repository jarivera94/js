import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { viewLeadComponent } from './viewLead.component';

describe('viewLeadComponent', () => {
  let component: viewLeadComponent;
  let fixture: ComponentFixture<viewLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ viewLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(viewLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
