import React from 'react';
import './403.scss';
import { TextService } from '../../utils';

export const Unauthorized = () => {
  return (
    <div className="unauthorized-view">
      {TextService.messages.unauthorized}
    </div>
  );
}

export default Unauthorized;
