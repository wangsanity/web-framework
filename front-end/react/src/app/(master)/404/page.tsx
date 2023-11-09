'use client';
import React from 'react';
import { useAppState } from '../../../contexts/app-context';
import './404.scss';

export default function NotFound() {
  const { messagesText } = useAppState();

  return <div className="not-found-view">{messagesText.notFound}</div>;
}
