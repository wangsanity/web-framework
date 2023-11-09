'use client';
import React, { useEffect, useState } from 'react';
import { SystemBusiness } from '@/business';
import { StringService, ToastService } from '@/utils';
import { APIError } from '@/models';
import './page.scss';

export default function Home() {
  const [readMeContent, setReadMeContent] = useState<string[]>([]);

  useEffect(() => {
    getReadMe();
  }, []);

  const getReadMe = () => {
    SystemBusiness.getReadMe().then((data) => {
      setReadMeContent(StringService.markDownToHTML(data));
    }).catch((err: APIError) => {
      ToastService.notify(err?.message || err, 'error');
    });
  };

  return (
    <div className="home-view">
      <div className="content-wrapper">
        {readMeContent.map((item, index) => (
          <div dangerouslySetInnerHTML={{ __html: item }} key={index}></div>
        ))}
      </div>
    </div>
  );
}
