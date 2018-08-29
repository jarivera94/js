import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Constants } from './index';

@Injectable()
export class ConvertLeadService {
  public url: string;

  constructor(private http: Http) {
    this.url = Constants.URL
  }
 
  convertLead(lead, opportunity, sugarId, sugarUserId) {
    let params = {
      lead: lead,
      opportunity:opportunity, 
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/convertLead', params)
      .map(res => res.json());
  }

}
