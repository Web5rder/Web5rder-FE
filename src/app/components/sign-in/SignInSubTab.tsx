'use client';

import { useRouter } from 'next/navigation';
import SignInConstants from '@/app/constants/sign-in';

function SignInSubTab() {
  const router = useRouter();
  return (
    <div className="flex gap-5">
      <button
        onClick={() => {
          router.push('/sign-in');
        }}
        type="button"
        className="text-gray-7 text-sm font-light"
      >
        {SignInConstants.CHANGE_PASSWORD}
      </button>
      <p className="text-sm">|</p>
      <button
        onClick={() => {
          router.push('/sign-in/sign-up');
        }}
        type="button"
        className="text-gray-7 text-sm font-light"
      >
        {SignInConstants.SIGN_UP}
      </button>
    </div>
  );
}

export default SignInSubTab;
