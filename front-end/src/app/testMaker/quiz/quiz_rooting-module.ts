import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent } from './quiz_component';
import { QuizResultComponent } from '../result/result_component';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent,
  },
  {
    path: 'result',
    component: QuizResultComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class QuizRoutingModule {}