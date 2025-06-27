import { NgModule } from '@angular/core'; // So this file can define its own Angular module
import { RouterModule, Routes } from '@angular/router'; // These are part of Angular's router system, allowing you to define URL-based navigation.


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


// This sets up the router module
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Registers all the routes defined above as application-level routes.
  exports: [RouterModule], // Makes the router available throughout the app.
})
export class AppRoutingModule {}
