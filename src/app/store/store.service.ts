import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {stateActions} from './main';

@Injectable()
export class StoreService {

  public actions;
  constructor(public store: Store<any>) {
    this.actions = stateActions;
  }

  select(slice: string) {
    return this.store.select(slice);
  }

  dispatch(payload) {
    return this.store.dispatch(payload);
  }
}
