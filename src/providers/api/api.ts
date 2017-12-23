import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'

//  Generic REST Api handler. 
@Injectable()
export class Api {
  url: string = 'https://kardashevserver.herokuapp.com'
  constructor(public http: HttpClient) { }

  get(endpoint: string, _params?: any, reqOpts?: any) {
    reqOpts = { 'params': new HttpParams() }

    for (let k in _params)
      reqOpts.params = reqOpts.params.append(k, _params[k])

    return this.http.get(this.url + '/' + endpoint, { responseType: 'json', params: _params })
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    reqOpts = { responseType: 'text' }
    return this.http.post(this.url + '/' + endpoint, body, reqOpts)
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts)
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts)
  }
}