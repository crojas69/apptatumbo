import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'site-survey',
    loadComponent: () =>
      import('./pages/site-survey/site-survey.page').then((m) => m.SiteSurveyPage),
  },
  {
    path: 'visit-approval',
    loadComponent: () =>
      import('./pages/visit-approval/visit-approval.page').then(m => m.VisitApprovalPage)
  }
];
