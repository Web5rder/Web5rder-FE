'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignInButton from '../common/SignInButton';
import SignInInput from '../common/SignInInput';
import SignInData, { emailRegex, passwordRegex } from '@/app/constants/sign-in';
import { ValidationType } from '@/app/_types/sign-in';

function SignUpComponents() {
  const router = useRouter();

  const [formState, setFormState] = useState({
    email: '',
    pwd: '',
    pwdConfirm: '',
    emailError: '',
    pwdError: '',
    pwdConfirmError: '',
  });

  const validateField = (
    type: ValidationType,
    value: string,
    password?: string,
  ) => {
    switch (type) {
      case 'email':
        if (!emailRegex.test(value)) {
          return { isValid: false, error: SignInData.SignUpError.EMAIL };
        }
        return { isValid: true, error: '' };
      case 'pwd':
        if (!passwordRegex.test(value)) {
          return {
            isValid: false,
            error: SignInData.SignUpError.PWD,
          };
        }
        return { isValid: true, error: '' };
      case 'pwdConfirm':
        if (value !== password) {
          return { isValid: false, error: SignInData.SignUpError.PWD_CONFIRM };
        }
        return { isValid: true, error: '' };

      default:
        return { isValid: false, error: '' };
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: ValidationType,
  ) => {
    const { value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleBtnClick = async () => {
    const { email, pwd, pwdConfirm } = formState;

    const emailValidation = validateField('email', email);
    const pwdValidation = validateField('pwd', pwd);
    const pwdConfirmValidation = validateField('pwdConfirm', pwdConfirm, pwd);

    if (
      emailValidation.isValid &&
      pwdValidation.isValid &&
      pwdConfirmValidation.isValid
    ) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/sign-in/sign-up`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password: pwd }),
          },
        );

        const responseData = await response.json();
        if (response.ok && responseData.isSuccess) {
          router.push('/sign-in/sign-up/client');
        } else {
          setFormState((prevState) => ({
            ...prevState,
            emailError: responseData.message,
          }));
        }
      } catch (error) {
        alert('오류가 발생했습니다.');
      }
    } else {
      setFormState((prevState) => ({
        ...prevState,
        emailError: emailValidation.error,
        pwdError: pwdValidation.error,
        pwdConfirmError: pwdConfirmValidation.error,
      }));
    }
  };

  return (
    <div className="w-full flex-center flex-col gap-6 max-w-[678px]">
      <SignInInput
        label={SignInData.SignInConstants.EMAIL}
        placeholder={SignInData.SignInPlaceholder.EMAIL}
        type="email"
        value={formState.email}
        onChange={(e) => handleInputChange(e, 'email')}
        error={!!formState.emailError}
        errorMessage={formState.emailError}
      />
      <SignInInput
        label={SignInData.SignInConstants.PWD}
        placeholder={SignInData.SignInPlaceholder.PWD}
        type="password"
        value={formState.pwd}
        onChange={(e) => handleInputChange(e, 'pwd')}
        error={!!formState.pwdError}
        errorMessage={formState.pwdError}
      />
      <SignInInput
        label={SignInData.SignInConstants.PWD_CONFIRM}
        placeholder={SignInData.SignInPlaceholder.PWD_CONFIRM}
        type="password"
        value={formState.pwdConfirm}
        onChange={(e) => handleInputChange(e, 'pwdConfirm')}
        error={!!formState.pwdConfirmError}
        errorMessage={formState.pwdConfirmError}
      />

      <SignInButton type="button" text="다음" onClick={handleBtnClick} />
    </div>
  );
}

export default SignUpComponents;
