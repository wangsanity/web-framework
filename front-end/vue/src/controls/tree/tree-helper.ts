import { type TreeNode } from './tree.interface';

export const setCheckStatus = (nodes: TreeNode[] = [], checkedStatus: boolean = false) => {
  nodes.forEach((node: TreeNode) => {
    node.checked = checkedStatus;
    setCheckStatus(node.children, checkedStatus);
  });
};

export const expandAll = (nodes: TreeNode[] = [], expanded: boolean = false) => {
  nodes.forEach((node: TreeNode) => {
    node.expanded = expanded;
    expandAll(node.children, expanded);
  });
};

export const clearUrl = (nodes: TreeNode[] = []) => {
  nodes.forEach((node: TreeNode) => {
    node.url = '';
    clearUrl(node.children);
  });
};

export const getCheckedIds = (nodes: TreeNode[] = [], ids: string[] = []): string[] => {
  nodes.forEach((node: TreeNode) => {
    if (node.checked) {
      ids.push(String(node.id));
    }
    getCheckedIds(node.children, ids);
  });
  return ids;
};

export const checkTargets = (nodes: TreeNode[] = [], targets: string[] = []) => {
  nodes.forEach((node: TreeNode) => {
    if (targets.indexOf(String(node.id)) > -1) {
      node.checked = true;
    }
    checkTargets(node.children, targets);
  });
};

export const checkAll = (nodes: TreeNode[] = [], checked: boolean = true) => {
  nodes.forEach((node: TreeNode) => {
    node.checked = checked;
    checkAll(node.children, checked);
  });
};

export const deselectItems = (nodes: TreeNode[] = []) => {
  nodes.forEach((node: TreeNode) => {
    if (node.selected) {
      node.selected = false;
    }
    deselectItems(node.children);
  });
};

export const checkPath = (
  path: string,
  nodes: TreeNode[] = [],
  parent: TreeNode | null = null,
  ancestors: TreeNode[] = [],
  autoExpand: boolean = false
) => {
  nodes.forEach((node: TreeNode) => {
    if (node.url === path || node.url === '/#' + path) {
      if (autoExpand) {
        if (parent) {
          parent.expanded = true;
        }
        ancestors.forEach((pathNode: TreeNode) => (pathNode.expanded = true));
      }
      node.selected = true;
    } else {
      checkPath(path, node.children, node, parent ? [...ancestors, parent] : ancestors, autoExpand);
    }
  });
};
