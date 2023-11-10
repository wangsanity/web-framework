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
  size?: 'small' | '';
}

export const Button = ({
  disabled,
  isLoading,
  children,
  className,
  role,
  size,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <span className="ctr-button">
      <button
        type="button"
        className={[
          'btn',
          role ? 'btn-' + role : '',
          'control-button',
          size ? 'btn-' + size : '',
        ].join(' ')}
        onClick={(e) => onClick && onClick(e)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className={'icon-box'}>
            <Image
              className="icon-loading"
              src="/assets/images/loading.gif"
              alt=""
              width="20"
              height="20"
              data-testid="spinner"
            />
          </span>
        )}
        {children}
      </button>
    </span>
  );
};
