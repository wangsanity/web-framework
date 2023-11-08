'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { ComUserProfile } from '../../components';
import { Loading } from '../../controls';
import { BaseInfoService, UserBusiness } from '../../business';
import { TextService, ToastService } from '../../utils';
import { User } from '../../models';
import './user-profile.scss';

export default function UserProfile() {
  const messagesText = TextService.messages;
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<User>();

  const getUserProfile = useCallback(() => {
    setIsLoading(true);

    const localUser = BaseInfoService.getUser();
    if (localUser) {
      UserBusiness.get(Number(localUser.userId))
        .then((user: User) => {
          setIsLoading(false);
          setUserInfo(user);
        })
        .catch((err) => {
          setIsLoading(false);
          ToastService.notify(err, 'error');
        });
    } else {
      ToastService.notify(messagesText.invalidParameters, 'error');
      setIsLoading(false);
    }
  }, [messagesText]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <div className="user-profile-view">
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <ComUserProfile item={userInfo}></ComUserProfile>
      )}
    </div>
  );
}
