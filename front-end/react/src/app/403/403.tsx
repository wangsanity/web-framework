'use client';
import React from 'react';
import './403.scss';
import { TextService } from '../../utils';

export default function Unauthorized() {
  return (
    <div className="unauthorized-view">{TextService.messages.unauthorized}</div>
  );
}
