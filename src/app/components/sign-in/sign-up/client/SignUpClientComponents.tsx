'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import SignInData from '@/app/constants/sign-in';
import SignInInput from '../../common/SignInInput';
import SignInButton from '../../common/SignInButton';

function SignUpClientComponents() {
  const router = useRouter();

  const [region, setRegion] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegion(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };
  return (
    <div className="w-full flex-center flex-col gap-6 max-w-[678px]">
      <SignInInput
        label={SignInData.SignInConstants.REGION}
        placeholder={SignInData.SignInPlaceholder.REGION}
        type="text"
        value={region}
        onChange={handleRegionChange}
      />
      <SignInInput
        label={SignInData.SignInConstants.NAME}
        placeholder={SignInData.SignInPlaceholder.NAME}
        type="password"
        value={name}
        onChange={handleNameChange}
      />
      <SignInInput
        label={SignInData.SignInConstants.ADDRESS}
        placeholder={SignInData.SignInPlaceholder.ADDRESS}
        type="password"
        value={address}
        onChange={handleAddressChange}
      />

      <SignInButton
        type="button"
        text="생성"
        onClick={() => {
          router.push('/sign-in');
        }}
        bgColor="bg-primary-1"
      />
    </div>
  );
}

export default SignUpClientComponents;
