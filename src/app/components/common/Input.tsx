import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  type: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className: string;
}

function Input({ value, type, onChange, className, ...props }: InputProps) {
  return (
    <input
      value={value}
      type={type}
      onChange={onChange}
      className={className}
      {...props}
    />
  );
}

export default Input;
