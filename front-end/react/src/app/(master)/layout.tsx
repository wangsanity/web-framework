'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BaseInfoService } from '../../business';
import { TextService } from '../../utils';
import { useRouter, usePathname } from 'next/navigation';
import { Menus } from './_menus/menus';
import { routeNames } from '../../router';
import { PopupMenu, PopupMenuItem } from '../../controls';
import { AppContext, AppWrapper } from '../../contexts/app-context';
import { UserToken } from '../../models';
import Image from 'next/image';
import '../../styles/app.scss';
import '../../styles/vendor.scss';
import './layout.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const appContext = useContext(AppContext);
  const [userToken, setUserToken] = useState<UserToken>();
  const [userMenus, setUserMenus] = useState<PopupMenuItem[]>([]);
  const [languages, setLanguages] = useState<PopupMenuItem[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [siteName, setSiteName] = useState('');

  const init = useCallback(() => {
    setCurrentLanguage(TextService.languageObject?.text);
    setSiteName(TextService.messages.siteName);
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
  }, [router]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    const token = BaseInfoService.getUser();
    appContext.setControlsText(TextService.controls);
    appContext.setMessagesText(TextService.messages);
    appContext.setUserToken(token);
  }, [appContext]);

  useEffect(() => {
    setUserToken(BaseInfoService.getUser());
  }, [pathname]);

  return (
    <html>
      <body>
        <AppWrapper>
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
        </AppWrapper>
      </body>
    </html>
  );
}
