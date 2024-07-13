import { FocusEventHandler, ChangeEventHandler } from 'react';

export type ValidationType = 'email' | 'pwd' | 'pwdConfirm';
export type ValidationClientType = 'region' | 'name' | 'address';

export interface SignInputProps {
  label: string;
  placeholder: string;
  type: string;
  value?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: () => void;
  onEnterPress?: () => void;
  error?: boolean;
  errorMessage?: string;
}
