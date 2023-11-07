import React, { useEffect, useState } from 'react';
import { Tree, deselectItems, checkPath } from '../../controls';
import { SystemBusiness } from '../../business';
import { usePathname } from 'next/navigation';
import { TreeNodeItem } from '../../controls/tree/tree-node/tree-node';
import Link from 'next/link';
import { useAppContext } from '@/contexts/app-context';
import './menus.scss';

export const Menus = () => {
  const appContext = useAppContext();
  const controlsText = appContext.controlsText;
  const pathname = usePathname();
  const [menus, setMenus] = useState<TreeNodeItem[]>([]);

  useEffect(() => {
    setMenus((menuList) => {
      deselectItems(menuList);
      checkPath(location.pathname, menuList, null, [], true);
      return [...menuList];
    });
  }, [pathname]);

  useEffect(() => {
    const systemMenus = SystemBusiness.getSystemMenus() || [];
    checkPath(window.location.pathname, systemMenus, null, [], true);
    setMenus(systemMenus);
  }, []);

  const onClickMenu = (menu: TreeNodeItem) => {
    if (!menu.children?.length) {
      deselectItems(menus);
      menu.selected = true;
    }

    if (menu.expanded) {
      menu.expanded = false;
    } else {
      menus.forEach((item) => (item.expanded = false));
      menu.expanded = true;
    }
    setMenus([...menus]);
  };

  const onSelectTreeItem = (menu: TreeNodeItem) => {
    deselectItems(menus, false);
    menu.selected = true;
    setMenus([...menus]);
  };

  return (
    <div className="menus-wrapper">
      <div className="top-menu">
        <span className="top-menu-button">
          <Link href="/home">
            <i className="fa fa-home"></i>
            <span>{controlsText.home}</span>
          </Link>
        </span>
      </div>
      <div className="menus-box">
        <div className="menus-container">
          {(menus || []).map((menu, index) => (
            <div key={menu.id || index} className="menu-item">
              <div className="menu-item-name" onClick={() => onClickMenu(menu)}>
                <span
                  className={
                    (menu.selected ? 'menu-selected ' : '') + 'menu-item-text'
                  }
                  title={menu.name}
                >
                  <i
                    className={(menu.icon || 'fa fa-folder-o') + ' menu-icon'}
                    style={{ color: menu.iconColor || '#677199' }}
                  ></i>
                  {menu.name}
                </span>
                <i className="fa fa-sort-desc"></i>
              </div>
              {(menu.children || []).length > 0 ? (
                <div className={(menu.expanded ? '' : 'hidden ') + 'sub-items'}>
                  <Tree
                    selectItem={(e) => onSelectTreeItem(e)}
                    items={menu.children}
                  ></Tree>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menus;
