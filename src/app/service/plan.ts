import * as _ from "lodash";

import {Injectable} from "@angular/core";

import {CONSTANT} from "../utils/constant";
import {Utils} from "../utils/utils";
import {RequestService} from "./request";

@Injectable()
export class PlanService {
  constructor(private _reqService: RequestService) {
  }

  _api_url = 'plan/';

  query(query: any, page: number, pageSize: number) {
    _.merge(query, {projectId: CONSTANT.CURR_PRJ_ID, page: page, pageSize: pageSize});
    return this._reqService.post(this._api_url + 'query', query);
  }

  get(projectId: number, id: number) {
    const data = {projectId: projectId, id: id};
    return this._reqService.post(this._api_url + 'get', data);
  }

  save(projectId: number, model: any) {
    let data = _.clone(model);
    data.projectId = projectId;

    data.tasks = null;
    data.startTime = !!data.startTime?Utils.dateStructToDate(data.startTime):null;
    data.endTime = !!data.endTime?Utils.dateStructToDate(data.endTime):null;
    return this._reqService.post(this._api_url + 'save', data);
  }

  delete(id: number) {
    let model = {id: id};
    return this._reqService.post(this._api_url + 'delete', model);
  }
}


