import React from 'react';
import './checkbox.scss';

export interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Checkbox = ({
  checked,
  children,
  onClick,
  onChange,
  ...props
}: CheckboxProps) => {
  return (
    <span className="ctr-checkbox">
      <input
        type="checkbox"
        defaultChecked={checked || false}
        onClick={onClick}
        onChange={onChange}
        {...props}
      />
      {children ? <span className="checkbox-text">{children}</span> : null}
    </span>
  );
};
