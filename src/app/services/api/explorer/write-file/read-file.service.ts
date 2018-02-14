import { Injectable } from '@angular/core';
import {ApiEndpoint} from '../../api-endpoint';

@Injectable()
export class WriteFileService extends ApiEndpoint {
  public config = {
    route: '/write-file',
    headers: {
      get: 'basic',
      post: 'basic',
    },
  };
}
