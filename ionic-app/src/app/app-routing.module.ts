import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'site-survey',
    pathMatch: 'full'
  },
  {
    path: 'site-survey',
    loadComponent: () => import('./pages/site-survey/site-survey.page').then(m => m.SiteSurveyPage)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
