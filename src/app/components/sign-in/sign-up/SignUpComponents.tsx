'use client';

import { useEffect, useState } from 'react';
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
    emailValid: false,
    pwdValid: false,
    pwdConfirmValid: false,
    emailTouched: false,
    pwdTouched: false,
    pwdConfirmTouched: false,
    emailError: '',
    pwdError: '',
    pwdConfirmError: '',
    isBtnActive: false,
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
        // 중복 검사
        if (value === 'test@example.com') {
          return {
            isValid: false,
            error: SignInData.SignUpError.EMAIL_DPLCT,
          };
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
    const { isValid, error } = validateField(
      type,
      value,
      type === 'pwdConfirm' ? formState.pwd : undefined,
    );

    setFormState((prevState) => ({
      ...prevState,
      [type]: value,
      [`${type}Valid`]: isValid,
      [`${type}Error`]: error,
    }));
  };

  const handleInputBlur = (type: ValidationType) => {
    setFormState((prevState) => ({
      ...prevState,
      [`${type}Touched`]: true,
    }));
  };

  useEffect(() => {
    const { email, pwd, pwdConfirm, emailValid, pwdValid, pwdConfirmValid } =
      formState;
    const isBtnActive =
      email &&
      pwd &&
      pwdConfirm &&
      emailValid &&
      pwdValid &&
      pwdConfirmValid &&
      pwd === pwdConfirm;

    if (isBtnActive !== formState.isBtnActive) {
      setFormState((prevState) => ({
        ...prevState,
        isBtnActive: Boolean(isBtnActive),
      }));
    }
  }, [
    formState.email,
    formState.pwd,
    formState.pwdConfirm,
    formState.emailValid,
    formState.pwdValid,
    formState.pwdConfirmValid,
  ]);

  const handleButtonClick = () => {
    if (formState.isBtnActive) {
      router.push('/sign-in/sign-up/client');
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
        onBlur={() => handleInputBlur('email')}
        error={formState.emailTouched && !formState.emailValid}
        errorMessage={formState.emailError}
      />
      <SignInInput
        label={SignInData.SignInConstants.PWD}
        placeholder={SignInData.SignInPlaceholder.PWD}
        type="password"
        value={formState.pwd}
        onChange={(e) => handleInputChange(e, 'pwd')}
        onBlur={() => handleInputBlur('pwd')}
        error={formState.pwdTouched && !formState.pwdValid}
        errorMessage={formState.pwdError}
      />
      <SignInInput
        label={SignInData.SignInConstants.PWD_CONFIRM}
        placeholder={SignInData.SignInPlaceholder.PWD_CONFIRM}
        type="password"
        value={formState.pwdConfirm}
        onChange={(e) => handleInputChange(e, 'pwdConfirm')}
        onBlur={() => handleInputBlur('pwdConfirm')}
        error={formState.pwdConfirmTouched && !formState.pwdConfirmValid}
        errorMessage={formState.pwdConfirmError}
      />

      <SignInButton
        isActive={formState.isBtnActive}
        type="button"
        text="다음"
        onClick={handleButtonClick}
        bgColor="bg-primary-1"
        subColor="bg-gray-2"
      />
    </div>
  );
}

export default SignUpComponents;
