import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDriverComponent } from './question-driver.component';

describe('QuestionDriverComponent', () => {
  let component: QuestionDriverComponent;
  let fixture: ComponentFixture<QuestionDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
