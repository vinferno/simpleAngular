import { Injectable } from '@angular/core';
import {ApiServicesTest, ApiTestService} from './test/api-test.service';
import {ApiExplorerService, ApiServicesExplorer} from './explorer/explorer.service';

@Injectable()
export class ApiService {

  constructor(
    public test: ApiTestService,
    public explorer: ApiExplorerService,
  ) { }

}

export const MainApiServices = [ApiService, ApiServicesTest, ApiServicesExplorer];
