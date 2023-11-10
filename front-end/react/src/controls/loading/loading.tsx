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
      className={['ctr-loading', absolute ? 'position-absolute' : ''].join(' ')}
      data-testid="ctr-loading"
      {...props}
    >
      <Image src="/assets/images/loading.gif" alt="Loading" width="20" height="20" />
    </div>
  );
};
