import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';
import {MovieDetailComponent} from './movie-detail/movie-detail.component';

const routes: Routes = [
  {
    path: '', component: TableComponent
  },
  {
    path: 'movie/:id', component: MovieDetailComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
