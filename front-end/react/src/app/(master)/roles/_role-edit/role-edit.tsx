import React, { useState } from 'react';
import { Button, Input } from '../../../../controls';
import { RoleBusiness } from '../../../../business';
import { ToastService } from '../../../../utils';
import { useAppState } from '../../../../contexts/app-context';
import { Role } from '../../../../models';
import './role-edit.scss';

export interface RoleEditProps {
  item?: Role;
  cancelEvent?: () => void;
  saveEvent?: () => void;
}

export const RoleEdit = ({ item = {}, saveEvent, cancelEvent }: RoleEditProps) => {
  const { controlsText, messagesText } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [editingItem, setEditingItem] = useState(item);

  const onSave = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setSubmitted(true);
    const method = editingItem.roleId
      ? RoleBusiness.update
      : RoleBusiness.insert;
    method(editingItem)
      .then(() => {
        setIsLoading(false);
        saveEvent && saveEvent();
        cancelEvent && cancelEvent();
      })
      .catch((err) => {
        setIsLoading(false);
        ToastService.notify(err?.message || err, 'error');
      });
  };

  const onCancel = () => {
    cancelEvent && cancelEvent();
  };

  return (
    <div className="com-role-edit">
      <div className="form-cols-2">
        <span className="form-label">{controlsText.name}：</span>
        <span className="form-value">
          <Input
            onChange={(e) =>
              setEditingItem({ ...editingItem, name: e.target.value })
            }
            value={editingItem.name || ''}
            placeholder={controlsText.name}
            errorMessage={messagesText.required(controlsText.name)}
            showError={submitted && !editingItem.name}
          ></Input>
        </span>
        <span className="form-label">{controlsText.description}：</span>
        <span className="form-value">
          <Input
            onChange={(e) =>
              setEditingItem({ ...editingItem, description: e.target.value })
            }
            value={editingItem.description || ''}
            placeholder={controlsText.description}
            onKeyUp={(e) => e.key === 'Enter' && onSave()}
          ></Input>
        </span>
        <span className="form-label">{controlsText.order}：</span>
        <span className="form-value">
          <Input
            type="number"
            onChange={(e) =>
              setEditingItem({ ...editingItem, order: Number(e.target.value) })
            }
            value={String(editingItem.order || '')}
            placeholder={controlsText.order}
            errorMessage={messagesText.required(controlsText.order)}
            showError={submitted && !editingItem.order}
          ></Input>
        </span>
      </div>
      <div className="button-row">
        <Button isLoading={isLoading} onClick={onSave.bind(this)}>
          {controlsText.save}
        </Button>
        <Button role="secondary" onClick={onCancel.bind(this)}>
          {controlsText.cancel}
        </Button>
      </div>
    </div>
  );
};

export default RoleEdit;
