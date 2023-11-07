export interface User {
  userId?: number;
  loginName?: string;
  fullName?: string;
  department?: string;
  birthday?: Date;
  email?: string;
  cellphone?: string;
  address?: string;
  addressCode?: number;
  remark?: string;
  order?: number;
  roles?: string;
}

export interface UserList {
  count: number;
  list: User[];
}

export interface Authorization {
  id?: number;
  routeName?: string;
  routePath?: string;
}

export interface UserToken {
  token?: string;
  userId?: number;
  loginName?: string;
  fullName?: string;
  authorizationList?: Authorization[];
}
