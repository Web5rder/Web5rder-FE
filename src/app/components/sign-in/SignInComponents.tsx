'use client';

import { useState } from 'react';
import SignInButton from './common/SignInButton';
import SignInInput from './common/SignInInput';
import SignInSubTab from './SignInSubTab';
import SignInData from '@/app/constants/sign-in';

function SignInComponents() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  };
  return (
    <div className="w-full flex-center flex-col gap-6 max-w-[678px]">
      <SignInInput
        label={SignInData.SignInConstants.EMAIL}
        placeholder={SignInData.SignInPlaceholder.EMAIL}
        type="email"
        value={email}
        onChange={handleEmailChange}
      />

      <SignInInput
        label={SignInData.SignInConstants.PWD}
        placeholder={SignInData.SignInPlaceholder.PWD_CONFIRM}
        type="password"
        value={pwd}
        onChange={handlePwdChange}
      />

      <SignInButton
        onClick={() => {
          alert('로그인');
        }}
        type="button"
        text={SignInData.SignInConstants.EMAIL}
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