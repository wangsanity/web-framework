export interface Role {
  roleId?: number;
  name?: string;
  description?: string;
  order?: number;
  checked?: boolean;
}

export interface RoleList {
  count: number;
  list: Role[];
}