import {Component, OnInit} from '@angular/core';
import {StoreService} from './store/store.service';

@Component({
  selector: 'vf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vf';
  public debug = true;

  constructor(public store: StoreService) {

  }
  ngOnInit() {
    this.store.store.subscribe( (state) => {
      if (this.debug) {
        console.log('state', '--------------------------' );
        console.log(JSON.stringify(state));
      }
    })
    this.store.store.select('test').subscribe( (test) => {
      console.log(test);
    });
  }
}
