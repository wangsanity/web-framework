'use client';
import React from 'react';
import './403.scss';
import { useAppState } from '../../../contexts/app-context';

export default function Unauthorized() {
  const { messagesText } = useAppState();

  return (
    <div className="unauthorized-view">{messagesText.unauthorized}</div>
  );
}
