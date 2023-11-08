import React, { useCallback, useEffect, useState } from 'react';
import { Tree, Loading } from '../../../../controls';
import {
  expandAll,
  checkAll,
  clearUrl,
  checkTargets,
  getCheckedIds,
} from '../../../../controls';
import { RoleBusiness, SystemBusiness } from '../../../../business';
import { ToastService } from '../../../../utils';
import { useAppContext } from '../../../../contexts/app-context';
import { Role } from '../../../../models';
import './access-control.scss';

export interface AccessControlProps {
  item?: Role;
  cancelEvent?: () => void;
  instance?: (params: { save: () => void }) => void;
}

export const AccessControl = ({
  item = {},
  cancelEvent,
  instance,
}: AccessControlProps) => {
  const { controlsText } = useAppContext();
  const [menus, setMenus] = useState(SystemBusiness.getSystemMenus());
  const [isLoading, setIsLoading] = useState(true);
  clearUrl(menus);
  expandAll(menus, true);

  const getRoleAccessList = useCallback(() => {
    if (item) {
      RoleBusiness.getAccessList(Number(item.roleId))
        .then((data) => {
          setIsLoading(false);
          checkTargets(menus, data);
        })
        .catch((err) => {
          setIsLoading(false);
          ToastService.notify(err, 'error');
        });
    }
  }, [item, menus]);

  useEffect(() => {
    getRoleAccessList();
  }, [getRoleAccessList]);

  const onCheckAll = (checked: boolean) => {
    checkAll(menus, checked);
    setMenus([...menus]);
  };

  const save = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    RoleBusiness.saveAccessList(Number(item.roleId), getCheckedIds(menus))
      .then(() => {
        setIsLoading(false);
        cancelEvent && cancelEvent();
      })
      .catch((err: string) => {
        setIsLoading(false);
        cancelEvent && cancelEvent();
        ToastService.notify(err, 'error');
      });
  };
  instance && instance({ save });

  return (
    <div className="com-access-control">
      {!isLoading ? (
        <div>
          <div className="link-button-row">
            <span className="link-button" onClick={() => onCheckAll(true)}>
              {controlsText.checkAll}
            </span>
            <span className="link-button" onClick={() => onCheckAll(false)}>
              {controlsText.uncheckAll}
            </span>
          </div>
          <Tree items={menus} showCheckbox={true}></Tree>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
};

export default AccessControl;
