import type { Authorization, UserToken } from '../models';
import { LocalDataService } from '../utils';

export class BaseInfoService {
  static clearUser() {
    try {
      LocalDataService.cookieRemove('userInfo');
    } catch (ex) {
      console.log(ex);
    }
  }

  static clearToken() {
    const user = this.getUser();
    if (user) {
      try {
        user.token = '';
        LocalDataService.cookieSet('userInfo', JSON.stringify(user));
      } catch (ex) {
        console.log(ex);
      }
    }
  }

  static getUser(): UserToken {
    return LocalDataService.cookieGet('userInfo') as UserToken;
  }

  static getValidUser() {
    const userInfo = LocalDataService.cookieGet('userInfo');
    try {
      if (!userInfo || !userInfo.token) {
        return null;
      } else {
        LocalDataService.cookieSet('userInfo', JSON.stringify(userInfo));
        return userInfo;
      }
    } catch (ex) {
      console.log(ex);
    }
    return userInfo;
  }

  static setUser(userData: UserToken) {
    const userInfo = {
      userId: userData.userId,
      loginName: userData.loginName,
      fullName: userData.fullName,
      token: userData.token
    };
    LocalDataService.cookieSet('userInfo', JSON.stringify(userInfo));
  }

  static setAuthorization(items: Authorization[] = []) {
    LocalDataService.localStorageSet('authorizationList', items);
  }

  static getAuthorization(): Authorization[] {
    return LocalDataService.localStorageGet('authorizationList');
  }

  static clearAuthorization() {
    LocalDataService.localStorageRemove('authorizationList');
  }
}
