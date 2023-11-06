import type { Role, RoleList } from '../models';
import { type HttpOptions, type QueryFilters } from '../models';
import { TextService } from '../utils';
import { BusinessBaseService } from './base/business-base.service';
import { HttpRequestService } from './base/http-request.service';
import { getRequiredMessagePromise, type ValidationResults } from './base/validations';

const apiBase = 'api/role';
const getApi = (url: string) => 'api/role/' + url;
const apis = {
  list: getApi('list'),
  accessList: getApi('accesslist')
};

export class RoleBusiness {
  static getList(filters: QueryFilters = {}): Promise<RoleList> {
    const options: HttpOptions = {
      url: apis.list
    };
    return BusinessBaseService.get(options, filters);
  }

  static get(id: string): Promise<Role> {
    const options: HttpOptions = {
      url: getApi(id)
    };
    return HttpRequestService.get(options);
  }

  static getAccessList(id: number): Promise<string[]> {
    const options: HttpOptions = {
      url: apis.accessList + '/' + id
    };
    return HttpRequestService.get(options);
  }

  static saveAccessList(roleId: number, accessList: string[]): Promise<void> {
    const options: HttpOptions = {
      url: apis.accessList + '/' + roleId,
      body: accessList
    };
    return HttpRequestService.post(options);
  }

  static delete(id: number): Promise<void> {
    const options: HttpOptions = {
      url: getApi(String(id))
    };
    return HttpRequestService.delete(options);
  }

  static insert(item: Role): Promise<ValidationResults | Role | null> {
    const message = RoleBusiness.validate(item);
    if (message) {
      return message;
    }

    const options: HttpOptions = {
      url: apiBase,
      body: item
    };
    return HttpRequestService.post(options);
  }

  static update(item: Role): Promise<ValidationResults | Role | null> {
    const message = RoleBusiness.validate(item);
    if (message) {
      return message;
    }

    const options: HttpOptions = {
      url: getApi(String(item.roleId)),
      body: item
    };
    return HttpRequestService.put(options);
  }

  static validate(item: Role): Promise<ValidationResults> | null {
    return getRequiredMessagePromise(
      [item.name || '', String(item.order || '')],
      [TextService.controls.name, TextService.controls.order]
    );
  }
}
