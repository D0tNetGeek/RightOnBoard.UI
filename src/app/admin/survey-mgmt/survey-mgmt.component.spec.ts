import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMgmtComponent } from './survey-mgmt.component';

describe('SurveyMgmtComponent', () => {
  let component: SurveyMgmtComponent;
  let fixture: ComponentFixture<SurveyMgmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMgmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
