import {HttpClient, HttpHeaders} from '@angular/common/http';

import 'rxjs/add/operator/shareReplay';

import {environment} from '../../../environments/environment';

import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';

type headerProp = 'getValidateHeaders' | 'getTokenHeaders' | 'basic' | 'passThrough' | 'none';

interface EndpointConfig {
  route: string;
  headers: {
    get?: string;
    post?: string;
    put?: string;
    delete?: string;
  };
}

@Injectable()
export class ApiEndpoint {
  public url: string = environment.host;
  public config: EndpointConfig;
  public getAction;
  public postAction;
  public putAction;
  public deleteAction;
  public getError;
  public postError;
  public putError;
  public deleteError;
  private sessionState;
  private session = { fingerprint: 'test-fingerprint', token: 'test-token'};

  constructor(public http: HttpClient,
              public store: Store<any>
  ) {
  }

  initialize(config: EndpointConfig) {
    this.config = config;
  }

  post(payload: any, paramRoute?, paramHeader?) {
    const headers = this.prepareHeader(paramHeader || this.config.headers.post);
    const route = paramRoute || this.config.route;

    const apiRequest = {
      route: this.config.route,
      payload,
      type: 'post',
      headers: headers,
      response: null,
      status: null,
    };
    const subscription = this.http.post(`${this.url}${route}`, payload, headers).shareReplay();

    subscription.subscribe(
      response => {
        apiRequest.response = response;
        apiRequest.status = response;
        if (this.postAction) {
          this.store.dispatch({type: this.postAction, payload: response});
        } else {
        }
      },
      error => {
        try {
          apiRequest.response = error.json();
        } catch (e) {
          apiRequest.response = null;
        }
        apiRequest.status = error.status;
        if (this.postError) {
          this.store.dispatch({type: this.postError, payload: error});
        } else {
        }
      },
    );
    return subscription;
  }

  put(payload: any, paramRoute?, paramHeader?) {
    const headers = this.prepareHeader(paramHeader || this.config.headers.put);
    const route = paramRoute || this.config.route;

    const apiRequest = {
      route: this.config.route,
      payload,
      type: 'put',
      headers: headers,
      response: null,
      status: null,
    };
    const subscription = this.http.put(`${this.url}${route}`, payload, headers).shareReplay();

    subscription.subscribe(
      response => {
        apiRequest.response = response;
        apiRequest.status = response;
        if (this.putAction) {
          this.store.dispatch({type: this.putAction, payload: response});
        } else {
        }
      },
      error => {
        try {
          apiRequest.response = error.json();
        } catch (e) {
          apiRequest.response = null;
        }
        apiRequest.status = error.status;
        if (this.putError) {
          this.store.dispatch({type: this.putError, payload: error});
        } else {
        }
      },
    );
    return subscription;
  }

  delete(paramRoute?, paramHeader?) {
    const headers = this.prepareHeader(paramHeader || this.config.headers.delete);
    const route = paramRoute || this.config.route;

    const apiRequest = {
      route: this.config.route,
      type: 'delete',
      headers: headers,
      response: null,
      status: null,
    };
    const subscription = this.http.delete(`${this.url}${route}`, headers).shareReplay();

    subscription.subscribe(
      response => {
        apiRequest.response = response;
        apiRequest.status = response;
        if (this.deleteAction) {
          this.store.dispatch({type: this.deleteAction, payload: response});
        } else {
        }
      },
      error => {
        try {
          apiRequest.response = error.json();
        } catch (e) {
          apiRequest.response = null;
        }
        apiRequest.status = error.status;
        if (this.deleteError) {
          this.store.dispatch({type: this.deleteError, payload: error});
        } else {
        }
      },
    );
    return subscription;
  }

  get(paramRoute?, paramHeader?) {
    const headers = this.prepareHeader(paramHeader || this.config.headers.get);
    const route = paramRoute || this.config.route;

    const apiRequest = {
      route,
      payload: {},
      type: 'get',
      headers: headers,
      response: null,
      status: null,
    };
    const finalRoute = `${this.url}${route}`;
    const subscription = this.http.get(finalRoute, headers).shareReplay();

    subscription.subscribe(
      response => {
        try {
          apiRequest.response = response;
        } catch (e) {
          apiRequest.response = null;
        }
        apiRequest.status = response;
        if (this.getAction) {
          this.store.dispatch({type: this.getAction, payload: response});
        } else {
        }
      },
      error => {
        try {
          apiRequest.response = error;
        } catch (e) {
          apiRequest.response = null;
        }
        apiRequest.status = error.status;
        if (this.getError) {
          this.store.dispatch({type: this.getError, payload: error});
        } else {
        }
      },
    );
    return subscription;
  }

  private prepareHeader(headerType: headerProp): object {
    let headers = new HttpHeaders();

    if (headerType === 'getTokenHeaders') {
      headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
      headers = headers.set('X-Auth-Fingerprint', this.session.fingerprint);
      headers = headers.set('Accept', 'application/json');
    }

    if (headerType === 'getValidateHeaders') {
      headers = headers.set('Authorization', `Token ${this.session.token}`);
      headers = headers.set('X-Auth-Fingerprint', this.session.fingerprint);
    }

    if (headerType === 'basic') {
      headers = headers.set('X-Auth-Fingerprint', this.session.fingerprint);
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Accept', '*/*');
    }

    if (headerType === 'passThrough') {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('X-Auth-Fingerprint', this.session.fingerprint);
      headers = headers.set('Accept', 'application/json');
    }

    if (headerType === 'none') {
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Accept', '*/*');
    }

    return {
      headers,
    };
  }
}
