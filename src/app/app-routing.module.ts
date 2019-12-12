import { ClientFilmListComponent } from './client/client-film-list/client-film-list.component';
import { ClientComponent } from './client/client/client.component';
import { AdminComponent } from './admin/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'film',
    pathMatch: 'prefix'
  },
  {
    path: 'admin',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
