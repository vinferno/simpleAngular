import { Injectable } from '@angular/core';
import {Resolve, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class PageTitleService implements Resolve<any> {

  constructor() { }

  resolve(route: any, stateSnap: RouterStateSnapshot): any {
    let name = route.data.pageTitle;
    if (!name) {
      name = 'No Page Title In Route';
    }
    return name;
  }
}
