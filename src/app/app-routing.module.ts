import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ClientFilmListComponent } from './client/client-film-list/client-film-list.component';
import { ClientComponent } from './client/client/client.component';
import { AdminComponent } from './admin/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'film',
    pathMatch: 'full'
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
