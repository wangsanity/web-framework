'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { ComUserList } from '../../../components';
import { Dialog } from '../../../controls';
import { RolesEdit } from './_roles-edit/roles-edit';
import { useAppState } from '../../../contexts/app-context';
import { TableButton, TableColumn } from '@/controls/table/table.interface';
import { UserRole } from '../../../models';
import './user-roles.scss';

export default function UserRoles() {
  const { controlsText } = useAppState();
  const [tableButtons, setTableButtons] = useState<TableButton[]>([]);
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [rolesDialogVisible, setRolesDialogVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<UserRole>();

  const setOptions = useCallback(() => {
    setColumns([
      {
        headerText: controlsText.loginName,
        field: 'loginName',
        click: (item: UserRole) => {
          setCurrentItem(item);
        },
      },
      { headerText: controlsText.fullName, field: 'fullName' },
      { headerText: controlsText.department, field: 'department' },
      { headerText: controlsText.remark, field: 'remark' },
      { headerText: controlsText.roles, field: 'roles' },
    ]);

    setTableButtons([
      {
        buttonText: controlsText.userRoles,
        headerText: controlsText.userRoles,
        click: (item: UserRole) => {
          setRolesDialogVisible(true);
          setCurrentItem(item);
        },
      },
    ]);
  }, [controlsText]);

  useEffect(() => {
    setOptions();
  }, [setOptions]);

  const onSave = () => {
    setRolesDialogVisible(false);
  };

  return (
    <div className="user-roles-view">
      <ComUserList buttons={tableButtons} columns={columns}></ComUserList>
      <Dialog
        visible={rolesDialogVisible}
        onClose={() => setRolesDialogVisible(false)}
        title={controlsText.userRoles}
        onCancel={() => setRolesDialogVisible(false)}
      >
        <RolesEdit
          cancelEvent={() => setRolesDialogVisible(false)}
          item={currentItem}
          saveEvent={onSave}
        ></RolesEdit>
      </Dialog>
    </div>
  );
}
