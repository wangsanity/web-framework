'use client';
import React, { useEffect, useState } from 'react';
import { SystemBusiness } from '@/business';
import { StringService } from '@/utils';
import './page.scss';

export default function Home() {
  const [readMeContent, setReadMeContent] = useState<string[]>([]);

  useEffect(() => {
    getReadMe();
  }, []);

  const getReadMe = () => {
    SystemBusiness.getReadMe().then((data) => {
      setReadMeContent(StringService.markDownToHTML(data));
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
