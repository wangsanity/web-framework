'use client';
import React, { useState } from 'react';
import { ComUserList } from '../../components';
import { Dialog, ConfirmDialog } from '../../controls';
import { UserBusiness } from '../../business';
import { TextService, ToastService } from '../../utils';
import { UserEdit } from './_user-edit/user-edit';
import { User } from '../../models';
import './users.scss';

export default function Users() {
  const controlsText = TextService.controls;
  const messagesText = TextService.messages;
  const [deleting, setDeleting] = useState(false);
  const [resetDialogVisible, setResetDialogVisible] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [currentItem, setCurrentItem] = useState<User>({});

  const getTableButtons = () => {
    return [
      {
        buttonText: controlsText.resetPassword,
        headerText: controlsText.resetPassword,
        click: (item: User) => {
          setResetDialogVisible(true);
          setCurrentItem(item);
        },
      },
      {
        buttonText: controlsText.edit,
        headerText: controlsText.edit,
        click: (item: User) => {
          setEditDialogVisible(true);
          setCurrentItem(item);
        },
      },
      {
        buttonText: controlsText.delete,
        headerText: controlsText.delete,
        click: (item: User) => {
          setConfirmDialogVisible(true);
          setCurrentItem(item);
        },
      },
    ];
  };

  const onDelete = () => {
    setDeleting(true);
    UserBusiness.delete(Number(currentItem.userId)).then(
      () => {
        // userListRef && userListRef.getList(true);
        setDeleting(false);
        setConfirmDialogVisible(false);
      },
      () => {
        setDeleting(false);
      }
    );
  };

  const onResetPassword = () => {
    setResettingPassword(true);
    UserBusiness.resetPassword(Number(currentItem.userId)).then(
      () => {
        setResettingPassword(false);
        setResetDialogVisible(false);
        ToastService.notify(messagesText.succeeded, 'success');
      },
      () => {
        setResettingPassword(false);
      }
    );
  };

  const onSave = () => {
    setEditDialogVisible(false);
    // userListRef && userListRef.getList(true);
  };

  const onToolbarClick = () => {
    setEditDialogVisible(true);
    setCurrentItem({});
  };

  return (
    <div className="users-view">
      <ComUserList
        buttons={getTableButtons()}
        showToolbar={true}
        toolbarEvent={onToolbarClick}
      ></ComUserList>
      <Dialog
        visible={editDialogVisible}
        onClose={() => setEditDialogVisible(false)}
        title={controlsText.userProfile}
        onCancel={() => setEditDialogVisible(false)}
      >
        <UserEdit
          cancelEvent={() => setEditDialogVisible(false)}
          item={currentItem}
          saveEvent={onSave}
        ></UserEdit>
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
      <ConfirmDialog
        visible={resetDialogVisible}
        isLoading={resettingPassword}
        title={controlsText.resetPassword}
        onOk={onResetPassword}
        onClose={() => setResetDialogVisible(false)}
        onCancel={() => setResetDialogVisible(false)}
      >
        {messagesText.resetPasswordConfirm}
      </ConfirmDialog>
    </div>
  );
}
