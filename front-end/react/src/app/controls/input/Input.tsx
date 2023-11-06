import React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  showClearButton?: boolean;
  showError?: boolean;
  errorMessage?: string;
  onClear?: () => void;
}

export const Input = ({
  value,
  type,
  showError,
  onClear,
  errorMessage,
  showClearButton = false,
}: InputProps) => {
  const clickClear = () => {
    onClear && onClear();
  };

  return (
    <span className="ctr-input">
      <input
        type={type || 'text'}
        value={value}
        className={['control-input', showError ? 'input-error' : ''].join(' ')}
      />
      {showError && errorMessage ? (
        <span className="error-message">{errorMessage}</span>
      ) : null}
      {showClearButton && value ? (
        <i className="fa fa-close" onClick={() => clickClear()}></i>
      ) : null}
    </span>
  );
};
