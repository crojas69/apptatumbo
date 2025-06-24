import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SiteSurveyPage } from './site-survey.page';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: SiteSurveyPage }]),
    SiteSurveyPage // 👈 esto importa el componente standalone
  ],
})
export class SiteSurveyPageModule {}
