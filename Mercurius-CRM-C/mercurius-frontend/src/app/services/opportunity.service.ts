import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Constants } from './index';

@Injectable()
export class OpportunityService {
  public url: string;

  constructor(private http: Http) {
    this.url = Constants.URL
  }

  createOpportunity(opportunity, sugarId, sugarUserId) {
    let params = {
      opportunity: opportunity,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/createOpportunity', params)
      .map(res => res.json());
  }

  updateOpportunity(opportunity, sugarId, sugarUserId) {
    let params = {
      opportunity: opportunity,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/updateOpportunity', params)
      .map(res => res.json());
  }

  deleteOpportunity(opportunity,sugarId, sugarUserId) {
    /*let params = {
      opportunity: opportunity,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/deleteOpportunity', params)
      .map(res => res.json());*/
    return this.http.delete(this.url + '/deleteOpportunity'+'?sugarId='+sugarId+'&opportunityId='+opportunity.id)
      .map(res => res.json());
  }

  getOpportunities(sugarId, sugarUserId) {
    return this.http.get(this.url + '/getOpportunity', {
      params:
      {
        sugarId: sugarId,
        sugarUserId: sugarUserId
      }
    }).map(res => res.json());
  }

  getOpportunitiesOptions() {
    return this.http.get(this.url + '/getEnumOpportunity', {

    }).map(res => res.json());
  }


}
