'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { BaseInfoService } from '../../business';
import { TextService } from '../../utils';
import { useRouter } from 'next/navigation';
import { Menus } from './_menus/menus';
import { routeNames } from '../../router';
import { PopupMenu, PopupMenuItem } from '../../controls';
import { UserToken } from '../../models';
import { useAppState } from '@/contexts/app-context';
import Image from 'next/image';
import '../../styles/app.scss';
import '../../styles/vendor.scss';
import './layout.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const appContext = useAppState();
  const [userToken, setUserToken] = useState<UserToken>();
  const [userMenus, setUserMenus] = useState<PopupMenuItem[]>([]);
  const [languages, setLanguages] = useState<PopupMenuItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [siteName, setSiteName] = useState('');

  const init = useCallback(() => {
    setCurrentLanguage(TextService.languageObject?.text);
    setSiteName(appContext.messagesText.siteName);
    setLanguages(
      TextService.controls.languages.map((item) => {
        return {
          name: item.text,
          click: () => {
            setCurrentLanguage(item.text);
            TextService.setLanguage(item.name, item.text);
          },
        };
      })
    );

    setUserMenus([
      { name: TextService.controls.userProfile, url: routeNames.userProfile },
      {
        name: TextService.controls.logout,
        click: () => {
          BaseInfoService.clearToken();
          BaseInfoService.clearAuthorization();
          router.push(routeNames.login);
        },
      },
    ]);
    setUserToken(appContext.userToken);
  }, [router, appContext]);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <div className="layout-box">
      <div className="navigation">
        <div className="navigation-left">
          <i className="fa fa-bicycle"></i>
          <span className="site-name">{siteName}</span>
        </div>
        <div className="navigation-right">
          <div className="language-wrapper">
            <PopupMenu items={languages} position="top-left">
              <span className="display-name">{currentLanguage}</span>
              <i className="fa fa-sort-desc"></i>
            </PopupMenu>
          </div>
          <PopupMenu items={userMenus} position="top-right">
            <span className="display-name">{userToken?.loginName}</span>
            <i className="fa fa-sort-desc"></i>
          </PopupMenu>
          <Image
            className="icon-head"
            width={26}
            height={26}
            src={'/assets/images/male.png'}
            alt=""
            priority={true}
          />
        </div>
      </div>
      <div className="main">
        <div className="main-left">
          <Menus />
        </div>
        <div className="router-view-wrapper">
          <div className="router-view">{children}</div>
        </div>
      </div>
    </div>
  );
}
