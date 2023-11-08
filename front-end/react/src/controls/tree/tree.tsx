import React, { useEffect, useState } from 'react';
import { TreeNodeItem, deselectItems } from './tree-helper';
import { TreeNode } from './tree-node/tree-node';
import './tree.scss';

export interface TreeProps {
  showCheckbox?: boolean;
  items?: TreeNodeItem[];
  theme?: 'white' | '';
  selectItem?: (item: TreeNodeItem) => void;
}

export const Tree = ({
  items = [],
  showCheckbox,
  theme,
  selectItem,
}: TreeProps) => {
  const [nodes, setNodes] = useState(items);

  useEffect(() => {
    setNodes(items);
  }, [items]);

  const onSelectItem = (menu: TreeNodeItem) => {
    deselectItems(nodes || [], false);
    menu.selected = true;
    selectItem && selectItem(menu);
    setNodes([...nodes]);
  };

  return (
    <div className="ctr-tree">
      <TreeNode
        className="tree-root"
        items={nodes}
        showCheckbox={showCheckbox}
        theme={theme}
        selectItem={(e) => onSelectItem(e)}
      ></TreeNode>
    </div>
  );
};
