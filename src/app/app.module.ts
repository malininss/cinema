import { ShowOrHideDirective } from './admin/admin-directives/show-or-hide.directive';
import { ClientModule } from './client/client.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin/admin.component';
import { LoginComponent } from './admin/login/login.component';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeRu, 'ru', localeRuExtra);

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    ShowOrHideDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ClientModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
