import { Component, OnInit } from '@angular/core';
import {routes} from '../../routes/routes';

@Component({
  selector: 'vf-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public routes = routes;

  constructor() { }

  ngOnInit() {
  }

}
