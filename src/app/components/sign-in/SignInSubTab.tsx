'use client';

import { useRouter } from 'next/navigation';
import SignInData from '@/app/constants/sign-in';

function SignInSubTab() {
  const router = useRouter();
  return (
    <div className="flex gap-5">
      <button
        onClick={() => {
          router.push('/sign-in');
        }}
        type="button"
        className="text-gray-5 text-sm font-light"
      >
        {SignInData.SignInConstants.CHANGE_PWD}
      </button>
      <p className="text-sm">|</p>
      <button
        onClick={() => {
          router.push('/sign-in/sign-up');
        }}
        type="button"
        className="text-gray-5 text-sm font-light"
      >
        {SignInData.SignInConstants.SIGN_UP}
      </button>
    </div>
  );
}

export default SignInSubTab;
