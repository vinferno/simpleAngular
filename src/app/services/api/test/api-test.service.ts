import { Injectable } from '@angular/core';
import {ConnectionService} from './connection/connection.service';

@Injectable()
export class ApiTestService {

  constructor(
    public connection: ConnectionService,
  ) { }

}

export const ApiServicesTest = [ApiTestService, ConnectionService];
