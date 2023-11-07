import { BaseInfoService } from '../base-info.service';
import { TextService } from '../../utils';
import { SERVERINFO } from '../../constants/app-info';
import type { HttpOptions } from '../../models';
import { routeNames } from '../../router';
import axios from 'axios';

export class HttpRequestService {
  private static _redirected = false;

  static delete(params: HttpOptions) {
    return this.sendRequest('DELETE', params);
  }

  static get(params: HttpOptions) {
    return this.sendRequest('GET', params);
  }

  static post(params: HttpOptions) {
    return this.sendRequest('POST', params);
  }

  static put(params: HttpOptions) {
    return this.sendRequest('PUT', params);
  }

  private static sendRequest(method: string, options: HttpOptions) {
    if (!this.handleRequest(options)) {
      return new Promise(function (resolve, reject) {
        reject();
      });
    }
    return this.apiAxios(method, options.url, options);
  }

  private static handleRequest(params: HttpOptions) {
    const user = BaseInfoService.getValidUser();
    if (!params.skipValidation && (!user || !user.token)) {
      this.goToLogin();
      return false;
    }

    params.headers = {
      'Content-Type': 'application/json',
      language: TextService.getLanguage()?.name,
      token: user && user.token ? user.token : '',
      ...params.headers
    };
    this._redirected = false;
    return true;
  }

  private static apiAxios(method: string, url: string, params: HttpOptions): Promise<any> {
    function resolveError(err: any) {
      if (
        err.status === 401 ||
        err.status === 0 ||
        err.toString().toLowerCase().indexOf('401') > -1
      ) {
        BaseInfoService.clearToken();
        HttpRequestService.goToLogin();
      }

      return false;
    }

    const promise = new Promise(function (resolve, reject) {
      axios(url, {
        baseURL: SERVERINFO.serverIP,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params.body : null,
        withCredentials: false,
        headers: params.headers
      })
        .then((res) => {
          if (res.status === 200) {
            setTimeout(() => { // for simulation, remove it if call backend service
              resolve(res.data);
            }, 200);
          } else {
            resolveError(res);
            reject(res.data);
          }
        })
        .catch((err) => {
          if (!resolveError(err)) {
            reject(err.response && err.response.data ? err.response.data : err.response);
          }
        });
    });

    return promise;
  }

  private static goToLogin() {
    if (HttpRequestService._redirected) {
      return;
    }
    HttpRequestService._redirected = true;
    if (window.location.href.toLowerCase().indexOf('login') === -1) {
      window.location.href = window.location.origin + routeNames.login;
      return;
    }
  }
}
