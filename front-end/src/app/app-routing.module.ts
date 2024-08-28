import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './userEngine/login/login.components';
import { RegisterComponent } from './userEngine/register/register.components';
import { StartComponent } from './components/start/start.component';
import { startRouteId } from 'src/exam/exam-routing.module';
export const examRouterCommands = ['exam'];

const routes: Routes = [
  { path: '', component: HomeComponent },  // Път за началната страница
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
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
