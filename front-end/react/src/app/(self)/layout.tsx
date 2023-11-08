'use client';
import { useEffect } from 'react';
import { AppWrapper, useAppContext } from '@/contexts/app-context';
import { TextService } from '@/utils';
import '@/styles/app.scss';
import '@/styles/vendor.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appContext = useAppContext();

  useEffect(() => {
    appContext.setControlsText(TextService.controls);
    appContext.setMessagesText(TextService.messages);
  }, [appContext]);

  return (
    <html>
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
