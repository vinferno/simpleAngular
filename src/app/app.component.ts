import {Component, OnInit} from '@angular/core';
import {StoreService} from './store/store.service';
import {ApiService} from './services/api/api.service';
import {stateActions} from './store/main';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'vf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vf';
  public debug = true;
  public connected = false;
  public test;

  constructor(public store: StoreService, public api: ApiService) {

  }
  ngOnInit() {
    this.store.store.subscribe( (state) => {
      if (this.debug) {
        console.log('state', '--------------------------' );
        console.log(JSON.stringify(state));
      }
    });

    this.api.test.connection.get().subscribe((connected) => {
      this.connected = true;
    });
    this.store.select('testState').subscribe( test => {
      this.test = test;
    })




    setInterval( () => {
      if (this.debug) {
        this.testConnection();
      }
    }, 10000);
  }

  testConnection() {
    this.api.test.connection.post(
      {test: 'is working'}
    ).subscribe((connected) => {
      this.connected = true;
      console.log('post response', connected);
      console.log('state actions', stateActions)
      if (connected) {
        this.store.dispatch(stateActions.test.updateTest({test: connected.test}));
      }
    }, () => {
      this.connected = false;
    });
  }
}
