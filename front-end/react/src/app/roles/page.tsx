'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { ComSearch, ComUserList } from '../../components';
import {
  Toolbar,
  Table,
  Dialog,
  PageBar,
  ConfirmDialog,
  PageOptions,
} from '../../controls';
import { RoleBusiness } from '../../business';
import { RoleEdit } from './_role-edit/role-edit';
import { AccessControl } from './_access-control/access-control';
import { useAppContext } from '../../contexts/app-context';
import { QueryFilters, Role, RoleList } from '../../models';
import { TableButton, TableColumn } from '@/controls/table/table.interface';
import './roles.scss';

export default function Roles() {
  const { controlsText, messagesText } = useAppContext();
  const [tableButtons, setTableButtons] = useState<TableButton[]>([]);
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [list, setList] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [roleUsersDialogVisible, setRoleUsersDialogVisible] = useState(false);
  const [accessControlDialogVisible, setAccessControlDialogVisible] =
    useState(false);
  const [accessControlSaving, setAccessControlSaving] = useState(false);
  const [pageBarOptions, setPageBarOptions] = useState({
    itemCount: 0,
    pageSize: 20,
    pageIndex: 1,
  });
  const [editingItem, setEditingItem] = useState<Role>();
  const [userFilters] = useState({});
  const [roleFilters, setRoleFilters] = useState({});

  const getList = useCallback(() => {
    setIsLoading(true);
    RoleBusiness.getList(roleFilters).then(
      (data: RoleList) => {
        setPageBarOptions((p) => {
          return { ...p, itemCount: data.count };
        });
        setIsLoading(false);
        setSearching(false);
        setList(data.list);
      },
      () => {
        setIsLoading(false);
        setSearching(false);
      }
    );
  }, [roleFilters]);

  const setTableConfig = useCallback(() => {
    setColumns([
      { headerText: controlsText.name, field: 'name' },
      { headerText: controlsText.description, field: 'description' },
      { headerText: controlsText.order, field: 'order' },
    ]);

    setTableButtons([
      {
        buttonText: controlsText.roleUsers,
        headerText: controlsText.roleUsers,
        click: (item: Role) => {
          setRoleUsersDialogVisible(true);
          setEditingItem(item);
        },
      },
      {
        buttonText: controlsText.accessControl,
        headerText: controlsText.accessControl,
        click: (item: Role) => {
          setAccessControlDialogVisible(true);
          setAccessControlSaving(false);
          setEditingItem(item);
        },
      },
      {
        buttonText: controlsText.edit,
        headerText: controlsText.edit,
        click: (item: Role) => {
          setDialogVisible(true);
          setEditingItem(item);
        },
      },
      {
        buttonText: controlsText.delete,
        headerText: controlsText.delete,
        click: (item: Role) => {
          setConfirmDialogVisible(true);
          setEditingItem(item);
        },
      },
    ]);
  }, [controlsText]);

  useEffect(() => {
    setTableConfig();
    getList();
  }, [getList, setTableConfig]);

  const onSave = () => {
    getList();
  };

  const onDelete = () => {
    setDeleting(true);
    RoleBusiness.delete(Number(editingItem?.roleId)).then(
      () => {
        setPageBarOptions({ ...pageBarOptions, pageIndex: 1 });
        setDeleting(false);
        setConfirmDialogVisible(false);
        getList();
      },
      () => {
        setDeleting(false);
      }
    );
  };

  const onPageUpdate = (options: PageOptions) => {
    console.log(options);
  };

  const onToolbarClick = () => {
    setDialogVisible(true);
    setEditingItem({ order: 1 });
  };

  const onSearch = (filters: QueryFilters) => {
    setRoleFilters({ ...filters, pageIndex: 1 });
    setSearching(true);
    getList();
  };

  const onSaveAccessControl = () => {
    setAccessControlSaving(true);
  };

  return (
    <div className="roles-view">
      <div className="search-toolbar-wrapper">
        <ComSearch isLoading={searching} searchEvent={onSearch}></ComSearch>
        <Toolbar clickEvent={onToolbarClick}></Toolbar>
      </div>
      <div>
        <Table
          data={list}
          columns={columns}
          options={{ buttons: tableButtons }}
          isLoading={isLoading}
        ></Table>
      </div>
      <div className="page-bar-wrapper">
        <PageBar
          options={pageBarOptions}
          changeEvent={(e) => onPageUpdate(e)}
        ></PageBar>
      </div>
      <Dialog
        visible={dialogVisible}
        onClose={() => setDialogVisible(false)}
        title={controlsText.role}
        onCancel={() => setDialogVisible(false)}
      >
        <RoleEdit
          cancelEvent={() => setDialogVisible(false)}
          item={editingItem}
          saveEvent={onSave}
        ></RoleEdit>
      </Dialog>
      <ConfirmDialog
        visible={confirmDialogVisible}
        isLoading={deleting}
        onOk={onDelete}
        onClose={() => setConfirmDialogVisible(false)}
        onCancel={() => setConfirmDialogVisible(false)}
      >
        {messagesText.deleteConfirm}
      </ConfirmDialog>
      <Dialog
        visible={accessControlDialogVisible}
        isLoading={accessControlSaving}
        title={controlsText.accessControl}
        showOkButton={true}
        showCancelButton={true}
        okButtonText={controlsText.save}
        onClose={() => setAccessControlDialogVisible(false)}
        onOk={onSaveAccessControl}
        onCancel={() => setAccessControlDialogVisible(false)}
      >
        <AccessControl
          item={editingItem}
          cancelEvent={() => setAccessControlDialogVisible(false)}
        ></AccessControl>
      </Dialog>
      <Dialog
        visible={roleUsersDialogVisible}
        onClose={() => setRoleUsersDialogVisible(false)}
        title={controlsText.roleUsers}
        onCancel={() => setRoleUsersDialogVisible(false)}
      >
        <ComUserList filters={userFilters}></ComUserList>
      </Dialog>
    </div>
  );
}
