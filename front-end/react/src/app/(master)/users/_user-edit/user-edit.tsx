import React, { useState } from 'react';
import { Button, Input, CityPicker, CityPickerResult } from '../../../../controls';
import { UserBusiness } from '../../../../business';
import { ToastService } from '../../../../utils';
import { useAppState } from '../../../../contexts/app-context';
import { User } from '../../../../models';
import './user-edit.scss';

export interface UserEditProps {
  item?: User;
  cancelEvent?: () => void;
  saveEvent?: () => void;
}

export const UserEdit = ({
  item = {},
  saveEvent,
  cancelEvent,
}: UserEditProps) => {
  const { controlsText, messagesText } = useAppState();
  const [originalCellphone] = useState(item?.cellphone || '');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [editingItem, setEditingItem] = useState<User>(item);

  const updateField = (field: keyof User, value: string | number) => {
    setEditingItem({ ...editingItem, [field]: value });
  };

  const onSave = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setSubmitted(true);

    let newEditingItem = { ...editingItem };
    if (originalCellphone === editingItem.cellphone) {
      newEditingItem.cellphone = undefined;
    }
    const method = newEditingItem.userId
      ? UserBusiness.update
      : UserBusiness.insert;
    method(newEditingItem)
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

  const onSelectCity = (picker: CityPickerResult) => {
    setEditingItem({
      ...editingItem,
      address:
        String(picker.province?.name) + picker.city?.name + picker.area?.name,
    });
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) =>
    e.key === 'Enter' && onSave();

  return (
    <div className="com-user-edit">
      <div className="form-cols-2">
        <span className="form-label">{controlsText.loginName}：</span>
        <span className="form-value">
          <Input
            onChange={(e) => updateField('loginName', e.target.value)}
            value={editingItem.loginName || ''}
            placeholder={controlsText.loginName}
            errorMessage={messagesText.required(controlsText.loginName)}
            showError={submitted && !editingItem.loginName}
          ></Input>
        </span>
        <span className="form-label">{controlsText.fullName}：</span>
        <span className="form-value">
          <Input
            onChange={(e) => updateField('fullName', e.target.value)}
            value={editingItem.fullName || ''}
            placeholder={controlsText.fullName}
            errorMessage={messagesText.required(controlsText.fullName)}
            showError={submitted && !editingItem.fullName}
          ></Input>
        </span>
        <span className="form-label">{controlsText.birthday}：</span>
        <span className="form-value">
          <Input
            type="date"
            onChange={(e) => updateField('birthday', e.target.value)}
            value={String(editingItem.birthday || '')}
            placeholder={controlsText.birthday}
          ></Input>
        </span>
        <span className="form-label">{controlsText.address}：</span>
        <span className="form-value">
          <CityPicker
            autoClose={true}
            addressCode={String(editingItem.addressCode)}
            confirmEvent={onSelectCity.bind(this)}
            width="294px"
          >
            <Input
              showClearButton={true}
              onChange={(e) => updateField('address', e.target.value)}
              value={editingItem.address || ''}
              placeholder={controlsText.address}
            ></Input>
          </CityPicker>
        </span>
        <span className="form-label">{controlsText.cellphone}：</span>
        <span className="form-value">
          <Input
            onChange={(e) => updateField('cellphone', e.target.value)}
            value={editingItem.cellphone || ''}
            placeholder={controlsText.cellphone}
            onKeyUp={onKeyUp}
          ></Input>
        </span>
        <span className="form-label">{controlsText.email}：</span>
        <span className="form-value">
          <Input
            type="email"
            onChange={(e) => updateField('email', e.target.value)}
            value={editingItem.email || ''}
            placeholder={controlsText.email}
            onKeyUp={onKeyUp}
          ></Input>
        </span>
        <span className="form-label">{controlsText.remark}：</span>
        <span className="form-value">
          <Input
            onChange={(e) => updateField('remark', e.target.value)}
            value={editingItem.remark || ''}
            placeholder={controlsText.remark}
            onKeyUp={onKeyUp}
          ></Input>
        </span>
      </div>
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

export default UserEdit;
