import { Injectable } from '@angular/core';
import {ApiEndpoint} from '../../api-endpoint';

@Injectable()
export class ReadfileService extends ApiEndpoint {
  public config = {
    route: '/read-file',
    headers: {
      get: 'basic',
      post: 'basic',
    },
  };
}
