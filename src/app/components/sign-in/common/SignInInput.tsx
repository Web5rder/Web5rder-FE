'use client';

import React from 'react';

interface SignInputProps {
  label: string;
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onEnterPress?: () => void;
}

function SignInInput({
  label,
  placeholder,
  type,
  value,
  onChange,
  onFocus,
  onBlur,
  onEnterPress,
}: SignInputProps) {
  return (
    <div className="w-full flex-col">
      <p className="text-gray-9 font-semibold pl-3 pb-[6px]">{label}</p>
      <input
        value={value}
        className="w-full p-3 items-center rounded-xl border-2 border-gray-3 bg-white text-gray-7 font-bold placeholder:text-gray-2 placeholder:font-normal"
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={(e) => e.key === 'Enter' && onEnterPress && onEnterPress()}
      />
    </div>
  );
}

SignInInput.defaultProps = {
  value: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onEnterPress: () => {},
};

export default SignInInput;
