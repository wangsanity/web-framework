import React from 'react';
import { TextService } from '@/utils';
import './404.scss';

export const NotFound = () => {

  return (
    <div className="not-found-view">
      {TextService.messages.notFound}
    </div>
  );
};

export default NotFound;
