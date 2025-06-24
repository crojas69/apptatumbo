import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SiteSurveyPage } from './site-survey.page';

describe('SiteSurveyPage', () => {
  let component: SiteSurveyPage;
  let fixture: ComponentFixture<SiteSurveyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSurveyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
