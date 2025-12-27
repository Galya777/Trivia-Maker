import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './userEngine/login/login.components';
import { RegisterComponent } from './userEngine/register/register.components';
import { TestsComponent } from './tests/tests.component';
import { TestResultsComponent } from './test-results/test-results.component';
import { PersonalComponent } from './personal/personal.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { AboutComponent } from './about/about.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        TestsComponent,
        TestResultsComponent,
        PersonalComponent,
        CompetitionsComponent,
        DashboardComponent,
        UsersComponent,
        AboutComponent
    ],
    providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class AppModule { }
