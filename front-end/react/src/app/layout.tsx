'use client';
import { useEffect, useState } from 'react';
import { AppWrapper, useAppContext } from '@/contexts/app-context';
import { TextService } from '@/utils';
import { BaseInfoService } from '@/business';
import Head from 'next/head';
import '@/styles/app.scss';
import '@/styles/vendor.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appContext = useAppContext();
  const [siteName, setSiteName] = useState('');

  useEffect(() => {
    const token = BaseInfoService.getUser();
    appContext.setUserToken(token);
    appContext.setControlsText(TextService.controls);
    appContext.setMessagesText(TextService.messages);
    setSiteName(TextService.messages.siteName);
  }, [appContext]);

  return (
    <html>
      <Head>
        <title>{siteName}</title>
      </Head>
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
