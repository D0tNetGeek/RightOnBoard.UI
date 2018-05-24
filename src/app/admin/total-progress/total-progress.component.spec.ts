import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalProgressComponent } from './total-progress.component';

describe('TotalProgressComponent', () => {
  let component: TotalProgressComponent;
  let fixture: ComponentFixture<TotalProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
