'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignInButton from '../common/SignInButton';
import SignInInput from '../common/SignInInput';
import SignInData from '@/app/constants/sign-in';

function SignUpComponents() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePwdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(e.target.value);
  };

  const handlePwdConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwdConfirm(e.target.value);
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
        placeholder={SignInData.SignInPlaceholder.PWD}
        type="password"
        value={pwd}
        onChange={handlePwdChange}
      />
      <SignInInput
        label={SignInData.SignInConstants.PWD_CONFIRM}
        placeholder={SignInData.SignInPlaceholder.PWD_CONFIRM}
        type="password"
        value={pwdConfirm}
        onChange={handlePwdConfirmChange}
      />

      <SignInButton
        type="button"
        text="거래처 생성"
        onClick={() => {
          router.push('/sign-in/sign-up/client');
        }}
        bgColor="bg-primary-1"
      />
    </div>
  );
}

export default SignUpComponents;
