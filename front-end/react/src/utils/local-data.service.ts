export class LocalDataService {
  /** cookie functions start */
  static cookieGet(name: string) {
    if (typeof window !== 'undefined') {
      const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
      const arr = document.cookie.match(reg);
      if (arr && arr.length > 1) {
        try {
          return JSON.parse(unescape(arr[2]));
        } catch {
          return arr[2] ? unescape(arr[2]) : null;
        }
      } else {
        return null;
      }
    }
  }

  static cookieRemove(name: string) {
    if (typeof window !== 'undefined') {
      const exp = new Date();
      exp.setTime(exp.getTime() - 1000);
      const cval = this.cookieGet(name);
      if (cval != null) {
        document.cookie = name + '=removed;expires=' + exp.toString();
      }
    }
  }

  /** expire: minutes */
  static cookieSet(
    name: string,
    value: string | Object,
    expire = 60 * 24 * 30
  ) {
    if (typeof window !== 'undefined') {
      if (Boolean(value) && typeof value !== 'string') {
        value = JSON.stringify(value);
      }
      const exp = new Date();
      exp.setTime(exp.getTime() + expire * 60 * 1000);
      document.cookie =
        name + '=' + escape(String(value)) + ';expires=' + exp.toString();
    }
  }
  /** cookie functions end */

  /** localStorage start */
  static localStorageGet(name: string): any {
    if (typeof window !== 'undefined') {
      let result = localStorage.getItem(name);
      try {
        result = result ? JSON.parse(result) : result;
      } catch (err) {
        console.log(err);
      }
      return result;
    }
  }

  static localStorageRemove(name: string) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(name);
      } catch (err) {
        console.log(err);
      }
    }
  }

  static localStorageSet(name: string, value: string | Object) {
    if (typeof window !== 'undefined') {
      if (Boolean(value) && typeof value !== 'string') {
        value = JSON.stringify(value);
      }
      try {
        localStorage.setItem(name, String(value));
      } catch (err) {
        console.log(err);
      }
    }
  }
  /** localStorage end */

  /** sessionStorage start */
  static sessionStorageGet(name: string) {
    if (typeof window !== 'undefined') {
      let result = sessionStorage.getItem(name);
      try {
        result = result ? JSON.parse(result) : result;
      } catch (err) {
        console.log(err);
      }
      return result;
    }
  }

  static sessionStorageRemove(name: string) {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.remove(name);
      } catch (err) {
        console.log(err);
      }
    }
  }

  static sessionStorageSet(name: string, value: string | Object) {
    if (typeof window !== 'undefined') {
      if (Boolean(value) && typeof value !== 'string') {
        value = JSON.stringify(value);
      }
      try {
        sessionStorage.set(name, value);
      } catch (err) {
        console.log(err);
      }
    }
  }
  /** sessionStorage end */
}
