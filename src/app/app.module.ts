import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './smart/welcome/welcome.component';
import {PageTitleService} from './resolvers/page-title/page-title.service';
import {StoreService} from './store/store.service';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store/main';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    }),
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [ PageTitleService, StoreService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
