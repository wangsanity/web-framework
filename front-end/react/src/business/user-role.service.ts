import { BusinessBaseService } from './base/business-base.service';
import { type HttpOptions, type QueryFilters, type UserRole, type UserRoleList } from '../models';
import { HttpRequestService } from './base/http-request.service';

const getApi = (url: string) => 'api/userrole/' + url;
const apis = {
  list: getApi('list')
};

export class UserRoleBusiness {
  static get(id: string): Promise<UserRole> {
    const options: HttpOptions = {
      url: getApi(id)
    };
    return HttpRequestService.get(options);
  }

  static getList(filters: QueryFilters = {}): Promise<UserRoleList> {
    const options: HttpOptions = {
      url: apis.list
    };
    return BusinessBaseService.get(options, filters);
  }
}
