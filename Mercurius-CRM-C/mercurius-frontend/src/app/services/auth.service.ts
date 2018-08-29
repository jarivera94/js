import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Constants } from './index';

@Injectable()
export class AuthService {
  public url: string;
  constructor(private http: Http) {
      this.url = Constants.URL;
  }

  login(user) {
      console.log("user AuthService",user)
    return this.http.post(`${this.url}/login`, user)
      .map(res => res.json());
  }

}
