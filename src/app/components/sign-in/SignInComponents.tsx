'use client';

import { useState } from 'react';
import SignInConstants from '@/app/constants/sign-in';
import SignInButton from './common/SignInButton';
import SignInInput from './common/SignInInput';
import SignInSubTab from './SignInSubTab';

function SignInComponents() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div className="w-full flex-center flex-col gap-6 max-w-[678px]">
      <SignInInput
        label={SignInConstants.EMAIL}
        placeholder="user@example.com"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />

      <SignInInput
        label={SignInConstants.PASSWORD}
        placeholder="********"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <SignInButton
        onClick={() => {
          alert('로그인');
        }}
        type="button"
        text={SignInConstants.LOGIN}
        bgColor="bg-primary-1"
      />

      <SignInButton
        onClick={() => {
          alert('카카오로그인');
        }}
        type="button"
        text="카카오로그인"
        bgColor="bg-yellow-1"
      />

      <SignInSubTab />
    </div>
  );
}

export default SignInComponents;
