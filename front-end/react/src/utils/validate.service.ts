export class ValidateService {
  static checkEmail(email: string) {
    if (!email) {
      return false;
    }
    const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return reg.test(email);
  }
  static checkCellphone(cellphone: string) {
    if (!cellphone) {
      return false;
    }
    const reg = /^1[0-9]{10}$/;
    return reg.test(cellphone);
  }

  static checkSpecial(str: string) {
    if (!str) {
      return false;
    }
    const reg = /^[a-zA-Z0-9_]{1,50}$/;
    // const reg = /^[\u4E00-\u9FA5a-zA-Z0-9_]{1,24}$/;
    return reg.test(str);
  }
}
