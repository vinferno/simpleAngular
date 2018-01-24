import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../store/store.service';
import {stateActions} from '../../store/main';

@Component({
  selector: 'vf-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  public pageTitle;
  public test;

  constructor(public route: ActivatedRoute, public store: StoreService ) { }

  ngOnInit() {
    this.pageTitle = this.route.snapshot.data['pageTitle'];
    this.store.select('test').subscribe( test => {
      this.test = test;
    });
  }


  update() {
    this.store.dispatch(stateActions.test.updateTest({test: 'try'}));
  }

}
