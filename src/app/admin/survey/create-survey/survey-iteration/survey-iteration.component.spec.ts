import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyIterationComponent } from './survey-iteration.component';

describe('SurveyIterationComponent', () => {
  let component: SurveyIterationComponent;
  let fixture: ComponentFixture<SurveyIterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyIterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyIterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
