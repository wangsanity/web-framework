import React, { useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Loading } from '../../../controls';
import { UserBusiness, RoleBusiness } from '../../../business';
import { TextService, ToastService } from '../../../utils';
import { Role, UserRole } from '../../../models';
import './roles-edit.scss';

export interface RolesEditProps {
  item?: UserRole;
  cancelEvent?: () => void;
  saveEvent?: () => void;
}

export const RolesEdit = ({ item, cancelEvent, saveEvent }: RolesEditProps) => {
  const controlsText = TextService.controls;
  const [isLoading, setIsLoading] = useState(false);
  const [editingItem] = useState<UserRole>({ ...item } as UserRole);
  const [list, setList] = useState<Role[]>([]);

  const setCheckBox = useCallback(() => {
    if (list?.length > 0 && editingItem.roleList) {
      let target;
      editingItem.roleList.forEach((item: Role) => {
        target = list.find((role) => role.roleId === item.roleId);
        if (target) {
          target.checked = true;
        }
      });
      setList([...list]);
    }
  }, [list, editingItem]);

  const getList = useCallback(() => {
    setIsLoading(true);
    RoleBusiness.getList().then(
      (data) => {
        setIsLoading(false);
        setList(data.list);
        setTimeout(() => {
          setCheckBox();
        });
      },
      () => {
        setIsLoading(false);
      }
    );
  }, [setCheckBox]);

  useEffect(() => {
    getList();
    if (item) {
      setCheckBox();
    }
  }, [getList, setCheckBox, item]);

  const onSave = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    UserBusiness.saveRoles(
      Number(editingItem.userId),
      list.filter((role) => role.checked).map((role) => Number(role.roleId))
    )
      .then((item) => {
        setIsLoading(false);
        saveEvent && saveEvent();
        cancelEvent && cancelEvent();
      })
      .catch((err) => {
        setIsLoading(false);
        ToastService.notify(err.message || err, 'error');
      });
  };

  const onCancel = () => {
    cancelEvent && cancelEvent();
  };

  return (
    <div className="com-roles-edit">
      {!isLoading ? (
        <div className="roles-wrapper">
          {list.map((item, index) => (
            <span key={index}>
              <span className="checkbox-wrapper">
                {item.checked}
                <Checkbox checked={item.checked}>{item.name}</Checkbox>
              </span>
            </span>
          ))}
        </div>
      ) : (
        <Loading></Loading>
      )}

      <div className="button-row">
        <Button state={isLoading ? 3 : 1} onClick={onSave.bind(this)}>
          {controlsText.save}
        </Button>
        <Button role="secondary" onClick={onCancel.bind(this)}>
          {controlsText.cancel}
        </Button>
      </div>
    </div>
  );
};

export default RolesEdit;
