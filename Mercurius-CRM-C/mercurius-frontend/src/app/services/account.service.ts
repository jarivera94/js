import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Constants } from './index';

@Injectable()
export class AccountService {
  public url: string;

  constructor(private http: Http) {
    this.url = Constants.URL
  }


  createAccount(account, sugarId, sugarUserId) {
    let params = {
      account: account,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/createAccount', params)
  }

  updateAccount(account, sugarId, sugarUserId) {
    let params = {
      account: account,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/updateAccount', params)
      .map(res => res.json());
  }

  deleteAccount(account,sugarId, sugarUserId) {
    /*let params = {
      account: account,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/deleteAccount', params)
      .map(res => res.json());*/
    return this.http.delete(this.url + '/deleteAccount'+'?sugarId='+sugarId+'&accountId='+account.id)
      .map(res => res.json());
  }

  getAccounts(sugarId, sugarUserId) {
    return this.http.get(this.url + '/getAccounts', {
      params:
      {
        sugarId: sugarId,
        sugarUserId: sugarUserId,
        validateOpConcreted: true
      }
    }).map(res => res.json());
  }

  getAccountsOptions() {
    return this.http.get(this.url + '/getEnumAccount', {

    }).map(res => res.json());
  }


}
