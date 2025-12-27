import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './userEngine/login/login.components';
import { RegisterComponent } from './userEngine/register/register.components';
import { StartComponent } from './components/start/start.component';
import { TestsComponent } from './tests/tests.component';
import { TestResultsComponent } from './test-results/test-results.component';
import { PersonalComponent } from './personal/personal.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AboutComponent } from './about/about.component';
import { startRouteId } from 'src/exam/exam-routing.module';
export const examRouterCommands = ['exam'];

const routes: Routes = [
  { path: '', component: HomeComponent },  // Home
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'test-results', component: TestResultsComponent },
  { path: 'personal', component: PersonalComponent },
  { path: 'competitions', component: CompetitionsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'about', component: AboutComponent },
  { path: 'createTest', redirectTo: '/start', pathMatch: 'full' },
    {
        path: 'start',
        component: StartComponent,
        data: {
            uid: startRouteId,
        },
    },
    {
        path: examRouterCommands[0],
        loadChildren: () => import('../exam/exam.module').then(m => m.ExamModule)
    },
  // Добавете други маршрути тук, ако имате нужда
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
