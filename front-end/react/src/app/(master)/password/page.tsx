'use client';
import React, { useState } from 'react';
import { Button, Input } from '../../../controls';
import { UserBusiness } from '../../../business';
import { ToastService } from '../../../utils';
import { useAppContext } from '../../../contexts/app-context';
import './password.scss';

export default function Password() {
  const { controlsText, messagesText } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [originalPassword, setOriginalPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onSave = () => {
    setIsLoading(true);
    setSubmitted(true);
    UserBusiness.modifyPassword(originalPassword, newPassword, passwordConfirm)
      .then(() => {
        setIsLoading(false);
        setSubmitted(false);
        onReset();
        ToastService.notify(messagesText.succeeded, 'success');
      })
      .catch((err) => {
        setIsLoading(false);
        ToastService.notify(err?.message || err, 'error');
      });
  };

  const onReset = () => {
    setOriginalPassword('');
    setNewPassword('');
    setPasswordConfirm('');
    setSubmitted(false);
  };

  return (
    <div className="password-view">
      <div className="form-wrapper">
        <div className="form-password">
          <span className="form-label">{controlsText.originalPassword}：</span>
          <span className="form-value">
            <Input
              type="password"
              onChange={(e) => setOriginalPassword(e.target.value)}
              placeholder={controlsText.originalPassword}
              errorMessage={
                messagesText.required &&
                messagesText.required(controlsText.originalPassword)
              }
              showError={submitted && !originalPassword}
            ></Input>
          </span>
          <span className="form-label">{controlsText.newPassword}：</span>
          <span className="form-value">
            <Input
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={controlsText.newPassword}
              errorMessage={
                messagesText.required &&
                messagesText.required(controlsText.newPassword)
              }
              showError={submitted && !newPassword}
            ></Input>
          </span>
          <span className="form-label">{controlsText.passwordConfirm}：</span>
          <span className="form-value">
            <Input
              type="password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && onSave()}
              placeholder={controlsText.passwordConfirm}
              errorMessage={
                messagesText.required &&
                messagesText.required(controlsText.passwordConfirm)
              }
              showError={submitted && !passwordConfirm}
            ></Input>
          </span>
        </div>
        <div className="button-row">
          <Button state={isLoading ? 3 : 1} onClick={onSave}>
            {controlsText.save}
          </Button>
          <Button role="secondary" onClick={onReset}>
            {controlsText.reset}
          </Button>
        </div>
      </div>
    </div>
  );
}
