import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './userEngine/login/login.components';
import { RegisterComponent } from './userEngine/register/register.components';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Път за началната страница
  { path: 'register', component: LoginComponent },
  { path: 'login', component: RegisterComponent },
  // Добавете други маршрути тук, ако имате нужда
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
