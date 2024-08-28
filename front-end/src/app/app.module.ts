import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './userEngine/login/login.components';
import { RegisterComponent } from './userEngine/register/register.components';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
