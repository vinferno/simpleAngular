import { Injectable } from '@angular/core';
import {ApiServicesTest, ApiTestService} from './test/api-test.service';

@Injectable()
export class ApiService {

  constructor(
    public test: ApiTestService,
  ) { }

}

export const MainApiServices = [ApiService, ApiServicesTest];
