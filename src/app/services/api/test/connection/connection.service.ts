import { Injectable } from '@angular/core';
import {ApiEndpoint} from '../../api-endpoint';

@Injectable()
export class ConnectionService extends ApiEndpoint {
  public config = {
    route: '/',
    headers: {
      get: 'basic',
      post: 'basic',
    },
  };
}
