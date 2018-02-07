import {WelcomeComponent} from '../smart/welcome/welcome.component';
import {Routes} from '@angular/router';
import {PageTitleService} from '../resolvers/page-title/page-title.service';
import {ExplorerComponent} from '../smart/explorer/explorer.component';

export const routes: Routes = [
  {
    path: 'explorer',
    component: ExplorerComponent,
    data: { pageTitle: 'welcome to vinson\'s guide for angular.' },
    resolve: {
      pageTitle: PageTitleService,
    }
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    data: { pageTitle: 'welcome to vinson\'s guide for angular.' },
    resolve: {
      pageTitle: PageTitleService,
    }
  },
  {path: '**', redirectTo: 'welcome'},
];
