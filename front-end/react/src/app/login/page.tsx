'use client';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input } from '../../controls';
import { ToastService } from '../../utils';
import { UserBusiness, BaseInfoService } from '../../business';
import { routeNames } from '../../router';
import { UserToken } from '../../models';
import { AppContext } from '../../contexts/app-context';
import './login.scss';

export default function Login() {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const { controlsText, messagesText } = appContext;
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState(
    BaseInfoService.getUser()?.loginName || ''
  );

  const login = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setSubmitted(true);
    UserBusiness.login(userName, password)
      .then((userToken) => {
        appContext.setUserToken(userToken as UserToken);
        setIsLoading(false);
        router.push(routeNames.home);
      })
      .catch((err) => {
        setIsLoading(false);
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
                errorMessage={
                  messagesText.required
                    ? messagesText.required(controlsText.userName)
                    : ''
                }
                showError={submitted && !userName}
              ></Input>
            </span>
            <span className="form-label">{controlsText.password}：</span>
            <span className="form-value">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) => e.key === 'Enter' && login()}
                placeholder={controlsText.password}
                errorMessage={
                  messagesText.required
                    ? messagesText.required(controlsText.password)
                    : ''
                }
                showError={submitted && !password}
              ></Input>
            </span>
          </div>
          <div className="button-row">
            <Button state={isLoading ? 3 : 1} onClick={() => login()}>
              {controlsText.login}
            </Button>
            <Button state={isLoading ? 2 : 1} onClick={reset}>
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
