'use client';
import { useEffect, useState } from 'react';
import { AppWrapper, useAppState } from '@/contexts/app-context';
import Head from 'next/head';
import '@/styles/app.scss';
import '@/styles/vendor.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteName, setSiteName] = useState('');
  const appContext = useAppState();

  useEffect(() => {
    setSiteName(appContext.messagesText.siteName);
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
