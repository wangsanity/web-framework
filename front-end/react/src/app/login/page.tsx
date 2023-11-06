'use client';
import React, { useState } from 'react';
import { Button, Input } from '../../controls';
import { TextService, ToastService } from '../../utils';
import { UserBusiness, BaseInfoService } from '../../business';
import './login.scss';
// import { useLocation, useNavigate } from 'react-router';
// import { routeNames } from '../router';

export default function Login() {
  // const navigate = useNavigate();
  // const location = useLocation();
  const controlsText = TextService.controls;
  const messagesText = TextService.messages;
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState(
    BaseInfoService.getUser()?.loginName || ''
  );

  const login = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setSubmitted(true);
    UserBusiness.login(userName, password)
      .then(() => {
        setLoading(false);
        // if (location.state?.redirectUrl) {
        //   window.location.href = location.state.redirectUrl;
        // } else {
        //   navigate(routeNames.home);
        // }
      })
      .catch((err) => {
        setLoading(false);
        ToastService.notify(err.message || err, 'error');
      });
  };

  const reset = () => {
    setUserName('');
    setPassword('');
    setSubmitted(false);
  };

  return (
    <div className="login-view">
      <div className="form-container">
        <div className="form-container-content">
          <div className="slogan">{messagesText.siteName}</div>
          <div className="form-cols-2 login-form">
            <span className="form-label">{controlsText.userName}：</span>
            <span className="form-value">
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={controlsText.userName}
                errorMessage={messagesText.required(controlsText.userName)}
                showError={submitted && !userName}
              ></Input>
            </span>
            <span className="form-label">{controlsText.password}：</span>
            <span className="form-value">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) => e.keyCode === 13 && login()}
                placeholder={controlsText.password}
                errorMessage={messagesText.required(controlsText.password)}
                showError={submitted && !password}
              ></Input>
            </span>
          </div>
          <div className="button-row">
            <Button state={loading ? 3 : 1} onClick={() => login()}>
              {controlsText.login}
            </Button>
            <Button state={loading ? 2 : 1} onClick={reset}>
              {controlsText.reset}
            </Button>
          </div>
        </div>
        <div className="form-container-bg"></div>
      </div>
      <div className="copyright">{messagesText.copyright}</div>
    </div>
  );
}
