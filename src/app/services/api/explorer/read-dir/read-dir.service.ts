import { Injectable } from '@angular/core';
import {ApiEndpoint} from '../../api-endpoint';

@Injectable()
export class ReadDirService extends ApiEndpoint {
  public config = {
    route: '/read-dir',
    headers: {
      get: 'basic',
      post: 'basic',
    },
  };
}
