import { TextService, ValidateService, EncryptionService } from '../utils';
import { BusinessBaseService } from './base/business-base.service';
import { BaseInfoService } from './base-info.service';
import {
  type Authorization,
  type HttpOptions,
  type QueryFilters,
  type User,
  type UserList,
  type UserToken
} from '../models';
import { HttpRequestService } from './base/http-request.service';
import {
  getFormatMessagePromise,
  getRequiredMessagePromise,
  type ValidationResults
} from './base/validations';

const apiBase = 'api/user';
const getApi = (url: string) => 'api/user/' + url;
const apis = {
  list: getApi('list'),
  login: getApi('login'),
  logout: getApi('logout'),
  modifyPassword: getApi('modifypassowrd'),
  resetPassword: getApi('resetpassword'),
  saveRoles: getApi('saveroles'),
  authorizedList: getApi('authorizedlist')
};

export class UserBusiness {
  static get(id: string): Promise<User> {
    const options: HttpOptions = {
      url: getApi(id)
    };
    return HttpRequestService.get(options);
  }

  static getList(filters: QueryFilters = {}): Promise<UserList> {
    const options: HttpOptions = {
      url: apis.list
    };
    return BusinessBaseService.get(options, filters);
  }

  static delete(id: number): Promise<void> {
    const options: HttpOptions = {
      url: getApi(String(id))
    };
    return HttpRequestService.delete(options);
  }

  static resetPassword(id: number): Promise<void> {
    const options: HttpOptions = {
      url: apis.resetPassword + '/' + id
    };
    return HttpRequestService.post(options);
  }

  static saveRoles(userId: string, roles: string[]): Promise<void> {
    const options: HttpOptions = {
      url: apis.saveRoles + '/' + userId,
      body: roles
    };
    return HttpRequestService.post(options);
  }

  static insert(item: User): Promise<ValidationResults | User | null> {
    const message = UserBusiness.validate(item);
    if (message) {
      return message;
    }

    const options: HttpOptions = {
      url: apiBase,
      body: item
    };
    return HttpRequestService.post(options);
  }

  static update(item: User): Promise<ValidationResults | User | null> {
    const message = UserBusiness.validate(item);
    if (message) {
      return message;
    }

    const options: HttpOptions = {
      url: getApi(String(item.userId)),
      body: item
    };
    return HttpRequestService.put(options);
  }

  static login(userName: string, password: string): Promise<ValidationResults | void> {
    const message = getRequiredMessagePromise(
      [userName, password],
      [TextService.controls.userName, TextService.controls.password]
    );
    if (message) {
      return message;
    }

    const options: HttpOptions = {
      url: apis.login,
      body: {
        userName,
        password: EncryptionService.md5(password)
      }
    };
    options.skipValidation = true;
    return HttpRequestService.post(options).then((data: UserToken) => {
      BaseInfoService.setUser(data);
      BaseInfoService.setAuthorization(data.authorizationList);
    });
  }

  static logout(): Promise<void> {
    const options: HttpOptions = {
      url: apis.logout
    };

    BaseInfoService.clearToken();
    BaseInfoService.clearAuthorization();
    return HttpRequestService.post(options);
  }
  static modifyPassword(
    originalPassword: string,
    newPassword: string,
    passwordConfirm: string
  ): Promise<ValidationResults | void> {
    const message = getRequiredMessagePromise(
      [originalPassword, newPassword, passwordConfirm],
      [
        TextService.controls.originalPassword,
        TextService.controls.newPassword,
        TextService.controls.passwordConfirm
      ]
    );
    if (message) {
      return message;
    }

    if (newPassword !== passwordConfirm) {
      return new Promise((resolve, reject) => {
        reject(TextService.messages.passwordMismatch);
      });
    }

    const options: HttpOptions = {
      url: apis.login,
      body: {
        originalPassword: EncryptionService.md5(originalPassword),
        newPassword: EncryptionService.md5(newPassword)
      }
    };
    options.skipValidation = true;
    return HttpRequestService.post(options).then((data: UserToken) => {
      BaseInfoService.setUser(data);
    });
  }

  static validate(item: User): Promise<ValidationResults> | null {
    let message = getRequiredMessagePromise(
      [item.loginName, item.fullName || ''],
      [TextService.controls.loginName, TextService.controls.fullName]
    );

    if (message) {
      return message;
    }

    message = getFormatMessagePromise(
      [item.email || '', item.cellphone || ''],
      [ValidateService.checkEmail, ValidateService.checkCellphone],
      [TextService.controls.email, TextService.controls.cellphone]
    );
    return message;
  }

  static getAuthorizedList(): Promise<Authorization[]> {
    const options: HttpOptions = {
      url: apis.authorizedList
    };
    return HttpRequestService.get(options);
  }
}
