import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Constants } from './index';

@Injectable()
export class LeadService {
  public url: string;

  constructor(private http: Http) {
    this.url = Constants.URL
  }

  createLead(lead, sugarId, sugarUserId) {
    let params = {
      lead: lead,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/createLead', params)
      .map(res => res.json());
  }

  updateLead(lead, sugarId, sugarUserId) {
    let params = {
      lead: lead,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/updateLead', params)
      .map(res => res.json());
  }  

  deleteLead(lead,sugarId) {
    /*let params = {
      lead: lead,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/deleteLead', params)
      .map(res => res.json());*/
    return this.http.delete(this.url + '/deleteLead'+'?sugarId='+sugarId+'&leadId='+lead.id)
      .map(res => res.json());

  }

  getLeads(sugarId, sugarUserId) {
    return this.http.get(this.url + '/getLead', {
      params:
      {
        sugarId: sugarId,
        sugarUserId: sugarUserId
      }
    }).map(res => res.json());
  }

  getLeadOptions() {
    return this.http.get(this.url + '/getEnumLead', {

    }).map(res => res.json());
  }



}
