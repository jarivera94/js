import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Constants } from './index';

@Injectable()
export class enumListsService {
  public url: string;

  constructor(private http: Http) {
    this.url = Constants.URL
  }  

  getLists(sugarId, listName) {
    return this.http.get(this.url + '/getListItems', {
      params:
      {
        sugarId: sugarId,
        module: listName
      }
    }).map(res => res.json());
  }
}
