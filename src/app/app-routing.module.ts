import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './smart/welcome/welcome.component';
import {PageTitleService} from './resolvers/page-title/page-title.service';

const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: {pageTitle: 'welcome to vinson\'s guide for angular.'},
    resolve: {
      pageTitle: PageTitleService,
    }
  },
  {path: '**', redirectTo: 'welcome'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
