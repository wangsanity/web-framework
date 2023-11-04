export interface TreeNode {
  name: string;
  url?: string;
  children?: TreeNode[];
  id?: string;
  icon?: string;
  iconColor?: string;
  expanded?: boolean;
  checked?: boolean;
  selected?: boolean;
}
