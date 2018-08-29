import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Constants } from './index';

@Injectable()
export class ContactService {
  public url: string;

  constructor(private http: Http) {
    this.url = Constants.URL
  }


  createContact(contact, sugarId, sugarUserId) {
    let params = {
      contact: contact,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/createContact', params)
  }

  updateContact(contact, sugarId, sugarUserId) {
    let params = {
      contact: contact,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/updateContact', params)
      .map(res => res.json());
  }

  deleteContact(contact,sugarId, sugarUserId) {
    /*let params = {
      contact: contact,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/deleteContact', params)
      .map(res => res.json());*/
    return this.http.delete(this.url + '/deleteContact'+'?sugarId='+sugarId+'&contactId='+contact.id)
      .map(res => res.json());
  }

  getContacts(sugarId, sugarUserId) {
    return this.http.get(this.url + '/getContacts', {
      params:
      {
        sugarId: sugarId,
        sugarUserId: sugarUserId
      }
    }).map(res => res.json());
  }

  getContactsOptions() {
    return this.http.get(this.url + '/getEnumContact', {

    }).map(res => res.json());
  }




}
