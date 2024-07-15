'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignInData, { clientMapping } from '@/app/constants/sign-in';
import SignInInput from '../../common/SignInInput';
import SignInButton from '../../common/SignInButton';
import { ValidationClientType } from '@/app/_types/sign-in';

function SignUpClientComponents() {
  const router = useRouter();

  const [formState, setFormState] = useState({
    region: '',
    name: '',
    address: '',
    regionError: '',
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
    const regionError = validateField('region', formState.region);
    const nameError = validateField('name', formState.name);
    const addressError = validateField('address', formState.address);

    if (regionError || nameError || addressError) {
      setFormState((prevState) => ({
        ...prevState,
        regionError,
        nameError,
        addressError,
        isBtnActive: false,
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        regionError: '',
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
        label={SignInData.SignInConstants.REGION}
        placeholder={SignInData.SignInPlaceholder.REGION}
        type="text"
        value={formState.region}
        onChange={(e) => handleInputChange(e, 'region')}
        error={!!formState.regionError}
        errorMessage={formState.regionError}
      />
      <SignInInput
        label={SignInData.SignInConstants.NAME}
        placeholder={SignInData.SignInPlaceholder.NAME}
        type="text"
        value={formState.name}
        onChange={(e) => handleInputChange(e, 'name')}
        error={!!formState.nameError}
        errorMessage={formState.nameError}
      />
      <SignInInput
        label={SignInData.SignInConstants.ADDRESS}
        placeholder={SignInData.SignInPlaceholder.ADDRESS}
        type="text"
        value={formState.address}
        onChange={(e) => handleInputChange(e, 'address')}
        error={!!formState.addressError}
        errorMessage={formState.addressError}
      />

      <SignInButton type="button" text="생성" onClick={handleBtnClick} />
    </div>
  );
}

export default SignUpClientComponents;
