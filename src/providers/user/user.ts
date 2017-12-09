import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

//  This User provider makes calls to our API at the `login` and `signup` endpoints.

//  Expects `login` and `signup` to return a JSON object: 
//
//  {
//    status: 'success',
//    user: {
//      // User fields like "id", "name", "email", etc.
//    }
//  }
//

@Injectable()
export class User {
  _user: any;

  constructor(public api: Api) { }

  // Send a POST request to our login endpoint  
  login(accountInfo: any) {
    let seq = this.api.post('login', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  // Send a POST request to our signup endpoint
  signup(accountInfo: any) {
    let seq = this.api.post('signup', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }


  // Log the user out, forget the session  
  logout() {
    this._user = null;
  }


  // Process a login/signup response to store user data
  _loggedIn(resp) {
    this._user = resp.user;
  }
}