import React from 'react';
import { User } from '../../models';
import { FormatService } from '../../utils';
import { useAppState } from '../../contexts/app-context';
import './user-profile.scss';

export interface ComUserProfileProps {
  item?: User;
}

export const ComUserProfile = ({ item }: ComUserProfileProps) => {
  const { controlsText } = useAppState();

  if (!item) {
    return null;
  }

  return (
    <div className="com-user-profile">
      <div className="user-profile">
        <span className="form-label">{controlsText.loginName}：</span>
        <span className="form-value">{item.loginName}</span>

        <span className="form-label">{controlsText.fullName}：</span>
        <span className="form-value">{item.fullName}</span>

        <span className="form-label">{controlsText.birthday}：</span>
        <span className="form-value">
          {FormatService.formatDate(item.birthday || '', 'yyyy-MM-dd')}
        </span>

        <span className="form-label">{controlsText.cellphone}：</span>
        <span className="form-value">{item.cellphone}</span>

        <span className="form-label">{controlsText.email}：</span>
        <span className="form-value">{item.email}</span>

        <span className="form-label">{controlsText.roles}：</span>
        <span className="form-value">{item.roles}</span>

        <span className="form-label">{controlsText.remark}：</span>
        <span className="form-value">{item.remark}</span>
      </div>
    </div>
  );
};
