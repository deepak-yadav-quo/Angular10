import { BooksResolverService } from './books/books-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { BooksComponent } from './books/books.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './books/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component:AuthComponent },
  { 
    path: 'books',
    component: BooksComponent,
    resolve: [BooksResolverService],
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent},
      { path: 'new', component: BookEditComponent},
      { path: ':id/edit', component: BookEditComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
