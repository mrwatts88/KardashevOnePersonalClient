import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

//  Generic REST Api handler. 
@Injectable()
export class Api {
  url: string = 'http://localhost:3000'

  constructor(public http: HttpClient) { }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
        responseType:'text'
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        console.log(params[k]);
        reqOpts.params = reqOpts.params.append(k, params[k]);
        console.log(reqOpts.params);

      }
    }
    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = {
      responseType:'text'
    }
    console.log(this.url + '/' + endpoint)
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }
}