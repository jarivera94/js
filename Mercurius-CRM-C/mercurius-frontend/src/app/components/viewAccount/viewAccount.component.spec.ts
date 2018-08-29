import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { viewAccountComponent } from './viewAccount.component';

describe('viewAccountComponent', () => {
  let component: viewAccountComponent;
  let fixture: ComponentFixture<viewAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ viewAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(viewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
