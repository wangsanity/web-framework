'use client';
import React from 'react';
import './403.scss';
import { useAppContext } from '../../../contexts/app-context';

export default function Unauthorized() {
  const { messagesText } = useAppContext();

  return (
    <div className="unauthorized-view">{messagesText.unauthorized}</div>
  );
}
