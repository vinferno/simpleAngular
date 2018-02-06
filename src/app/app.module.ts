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
import {ApiService, MainApiServices} from './services/api/api.service';
import {HttpClientModule} from '@angular/common/http';
import { ObjectPropsPipe } from './pipes/object-props/object-props.pipe';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ObjectPropsPipe
  ],
  imports: [
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 5 //  Retains last 5 states
    }),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [ PageTitleService, StoreService, ApiService, MainApiServices, ObjectPropsPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
