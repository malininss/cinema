import { ClientPaymentComponent } from './client-payment/client-payment.component';
import { ClientTicketComponent } from './client-ticket/ticket.component';
import { ClientHallComponent } from './client-hall/client-hall.component';
import { ClientComponent } from './client/client.component';
import { ClientFilmListComponent } from './client-film-list/client-film-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ClientComponent,
        children: [
          {
            path: 'film',
            component: ClientFilmListComponent
          },
          {
            path: 'hall/:hallId/:filmId/:currentDay',
            component: ClientHallComponent
            // products/:productId', component: ProductDetailsComponent
          },
          {
            path: 'ticket',
            component: ClientTicketComponent
          },
          {
            path: 'payment',
            component: ClientPaymentComponent
          }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
