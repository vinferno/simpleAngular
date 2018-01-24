import {Component, OnInit} from '@angular/core';
import {StoreService} from './store/store.service';
import {ApiService} from './services/api/api.service';

@Component({
  selector: 'vf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vf';
  public debug = true;
  public connected = false;

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
  }
}
