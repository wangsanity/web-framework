import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import Image from 'next/image';
import './loading.scss';

export interface LoadingProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  absolute?: boolean;
}

export const Loading = ({ absolute, ...props }: LoadingProps) => {
  return (
    <div
      className={['loading-box', absolute ? 'position-absolute' : ''].join(' ')}
      {...props}
    >
      <Image src="/assets/images/loading.gif" alt="" width="20" height="20" />
    </div>
  );
};
