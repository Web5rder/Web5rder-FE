'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  clientMapping,
  SIGNIN_PLACEHOLDER,
  SIGNIN_TEXT,
  SIGNUP_BUTTON,
} from '@/app/constants/sign-in';
import SignInInput from '../../common/SignInInput';
import SignInButton from '../../common/SignInButton';
import { ValidationClientType } from '@/app/_types/sign-in';

function SignUpClientComponents() {
  const router = useRouter();

  const [formState, setFormState] = useState({
    name: '',
    address: '',
    nameError: '',
    addressError: '',
    isBtnActive: false,
  });

  const validateField = (type: ValidationClientType, value: string) => {
    if (!value.trim()) {
      return `${clientMapping[type]}을(를) 입력해주세요.`;
    }
    return '';
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: ValidationClientType,
  ) => {
    const { value } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [type]: value,
      [`${type}Error`]: validateField(type, value),
    }));
  };

  const handleBtnClick = () => {
    const nameError = validateField('name', formState.name);
    const addressError = validateField('address', formState.address);

    if (nameError || addressError) {
      setFormState((prevState) => ({
        ...prevState,
        nameError,
        addressError,
        isBtnActive: false,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        nameError: '',
        addressError: '',
        isBtnActive: true,
      }));
      router.push('/sign-in');
    }
  };

  return (
    <div className="w-full flex-center flex-col gap-6 max-w-[678px]">
      <SignInInput
        label={SIGNIN_TEXT[6]}
        placeholder={SIGNIN_PLACEHOLDER[4]}
        type="text"
        value={formState.name}
        onChange={(e) => handleInputChange(e, 'name')}
        error={!!formState.nameError}
        errorMessage={formState.nameError}
      />
      <SignInInput
        label={SIGNIN_TEXT[7]}
        placeholder={SIGNIN_PLACEHOLDER[5]}
        type="text"
        value={formState.address}
        onChange={(e) => handleInputChange(e, 'address')}
        error={!!formState.addressError}
        errorMessage={formState.addressError}
      />

      <SignInButton
        type="button"
        text={SIGNUP_BUTTON[1]}
        onClick={handleBtnClick}
      />
    </div>
  );
}

export default SignUpClientComponents;
