'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignInButton from './common/SignInButton';
import SignInInput from './common/SignInInput';
import SignInSubTab from './SignInSubTab';
import SignInData from '@/app/constants/sign-in';
import { ValidationType } from '@/app/_types/sign-in';
import { postLogin } from '@/app/service/postRequest';

function SignInComponents() {
  const router = useRouter();

  const [signInState, setSignInState] = useState({
    email: '',
    pwd: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: ValidationType,
  ) => {
    const { value } = e.target;
    setSignInState((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleBtnClick = async () => {
    const { email, pwd } = signInState;
    try {
      const responseData = await postLogin({ email, pwd });
      if (responseData.isSuccess) {
        localStorage.setItem('JMFtoken', responseData.result.access_token);
        router.push('/');
      } else {
        alert(SignInData.SignInError.LOGIN);
      }
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div className="w-full flex-center flex-col gap-6 max-w-[678px]">
      <SignInInput
        label={SignInData.SignInConstants.EMAIL}
        placeholder={SignInData.SignInPlaceholder.EMAIL}
        type="email"
        value={signInState.email}
        onChange={(e) => handleInputChange(e, 'email')}
      />

      <SignInInput
        label={SignInData.SignInConstants.PWD}
        placeholder={SignInData.SignInPlaceholder.PWD_CONFIRM}
        type="password"
        value={signInState.pwd}
        onChange={(e) => handleInputChange(e, 'pwd')}
      />

      <SignInButton
        onClick={handleBtnClick}
        type="button"
        text={SignInData.SignInConstants.LOGIN}
      />

      <SignInButton
        onClick={() => {
          alert('카카오로그인');
        }}
        type="button"
        text="카카오로그인"
      />

      <SignInSubTab />
    </div>
  );
}

export default SignInComponents;
