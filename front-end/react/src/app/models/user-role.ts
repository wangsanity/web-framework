import type { Role } from './role';

export interface UserRole {
  userId?: number;
  loginName: string;
  fullName?: string;
  department?: string;
  remark?: string;
  roles?: string;
  roleList?: Role[];
}

export interface UserRoleList {
  count: number;
  list: UserRole[];
}
