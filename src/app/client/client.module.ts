import { BrowserModule } from '@angular/platform-browser';
import { ClientTicketComponent } from './client-ticket/ticket.component';
import { ClientHallComponent } from './client-hall/client-hall.component';
import { ClientPaymentComponent } from './client-payment/client-payment.component';
import { ClientRoutingModule } from './client-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientFilmListComponent } from './client-film-list/client-film-list.component';
import { HeaderComponent } from './header/header.component';
import { ClientComponent } from './client/client.component';
import { HttpClientModule } from '@angular/common/http';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    ClientFilmListComponent,
    ClientPaymentComponent,
    ClientHallComponent,
    ClientTicketComponent,
    HeaderComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
})
export class ClientModule { }
