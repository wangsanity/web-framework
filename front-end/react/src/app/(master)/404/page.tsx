'use client';
import React from 'react';
import { useAppContext } from '../../../contexts/app-context';
import './404.scss';

export default function NotFound() {
  const { messagesText } = useAppContext();

  return <div className="not-found-view">{messagesText.notFound}</div>;
}
