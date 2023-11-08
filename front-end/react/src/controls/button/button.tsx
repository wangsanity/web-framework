import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import Image from 'next/image';
import './button.scss';

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
  role?: 'primary' | 'secondary';
  state?: 1 | 2 | 3;
  size?: 'small' | '';
}

export const Button = ({
  disabled,
  isLoading,
  children,
  className,
  role,
  state = 1,
  size,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <span className="ctr-button">
      <button
        type="button"
        disabled={state > 1 ? true : false}
        className={[
          'btn',
          role ? 'btn-' + role : '',
          'control-button',
          size ? 'btn-' + size : '',
        ].join(' ')}
        onClick={(e) => onClick && onClick(e)}
        {...props}
      >
        {state === 3 && (
          <span className={'icon-box'}>
            <Image
              className="icon-loading"
              src="/assets/images/loading.gif"
              alt=""
              width="20"
              height="20"
            />
          </span>
        )}
        {children}
      </button>
    </span>
  );
};
