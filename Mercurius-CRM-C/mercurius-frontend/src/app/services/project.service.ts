import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
import { Constants } from './index';

@Injectable()
export class ProjectService {
  public url: string;

  constructor(private http: Http) {
    this.url = Constants.URL
  }

  createProject(project, sugarId, sugarUserId) {
    let params = {
      project: project,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/createProject', params)
      .map(res => res.json());
  }

  updateProject(project, sugarId, sugarUserId) {
    let params = {
      project: project,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/updateProject', params)
      .map(res => res.json());
  }

  deleteProject(project,sugarId, sugarUserId) {
    /*let params = {
      project: project,
      sugarId: sugarId,
      sugarUserId: sugarUserId
    }
    return this.http.post(this.url + '/deleteProject', params)
      .map(res => res.json());*/
    console.log(project.id, 'sid:'+sugarId, 'sUid:'+sugarUserId);
    return this.http.delete(this.url + '/deleteProject'+'?sugarId='+sugarId+'&projectId='+project.id)
      .map(res => res.json());
  }

  getProject(sugarId, sugarUserId) {
    return this.http.get(this.url + '/getProject',
      {
        params:
        {
          sugarId: sugarId,
          sugarUserId: sugarUserId
        }
      }).map(res => res.json());
  }



}
