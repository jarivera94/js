import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Constants } from './index';

@Injectable()
export class CampaignService {
  public url: string;

  constructor(private http: Http) {
    this.url = Constants.URL
  }


  createCampaign(campaign, sugarId, sugarUserId) {
    let params = {
      campaign: campaign,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/createCampaign', params)
  }

  updateCampaign(campaign, sugarId, sugarUserId) {
    let params = {
      campaign: campaign,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/updateCampaign', params)
      .map(res => res.json());
  }

  deleteCampaign(sugarId,campaign) {
    /*let params = {
      campaign: campaign,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/deleteCampaign', params)
      .map(res => res.json());*/

    return this.http.delete(this.url + '/deleteCampaign'+'?sugarId='+sugarId+'&campaignId='+campaign.id)
      .map(res => res.json());

  }

  getCampaigns(sugarId, sugarUserId) {
    return this.http.get(this.url + '/getCampaigns', {
      params:
      {
        sugarId: sugarId,
        sugarUserId: sugarUserId
      }
    }).map(res => res.json());
  }

  getCampaignsOptions() {
    return this.http.get(this.url + '/getEnumCampaign', {

    }).map(res => res.json());
  }


}
