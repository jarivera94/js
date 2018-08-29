import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Constants } from './index';

@Injectable()
export class deparmentListsService {
  public url: string;

  constructor(private http: Http) {
    this.url = Constants.URL
  }  

  getListsDepartments(sugarId, campaign) {
    return this.http.get(this.url + '/getListApartments', {
      params:
      {
        sugarId: sugarId,
        campaignId: campaign
      }
    }).map(res => res.json());
  }
}
