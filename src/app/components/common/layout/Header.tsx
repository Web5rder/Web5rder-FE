'use client';

import { HEADER_TEXT } from '@/app/constants/common';
import { useUser } from '@/app/hooks/useUser';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Header() {
  const { user } = useUser();
  const router = useRouter();
  const handleLogout = () => {
    document.cookie = `accessToken=; expires=0; path=/;`;
    router.push('/');
  };

  return (
    <div className="relative w-full border-b-2 pt-2 drop-shadow-lg">
      <header className="relative w-full h-[74px] flex items-center px-20">
        <div className="absolute left-40 cursor-pointer">
          <Image src="/Images/JMF2.png" width={88} height={64} alt="logo" />
        </div>
        <div className="flex gap-x-10 items-center justify-center w-full font-normal text-2xl ml-12 mr-40 ">
          <Link href="/">{HEADER_TEXT[0]}</Link>
          <Link href="/order">{HEADER_TEXT[1]}</Link>
          <Link href="/quotation">{HEADER_TEXT[2]}</Link>
          <Link href="/pastorder">{HEADER_TEXT[3]}</Link>
        </div>
        <div className="flex gap-x-3 h-full items-end mb-3 font-semibold text-lg text-[#6ABE39] absolute right-40">
          {user?.isSuccess ? (
            <div className="flex gap-x-3">
              <Link
                href="/"
                className="text-gray-5"
                onClick={() => handleLogout()}
              >
                {HEADER_TEXT[6]}
              </Link>
              <Link
                href={
                  user.code === '4005'
                    ? '/sign-in/client'
                    : '/sign-in/client/edit'
                }
              >
                {HEADER_TEXT[7]}
              </Link>
            </div>
          ) : (
            <div className="flex gap-x-3">
              <Link href="/sign-in/sign-up">{HEADER_TEXT[4]}</Link>
              <Link href="/sign-in">{HEADER_TEXT[5]}</Link>
            </div>
          )}
        </div>
        <div className="flex w-[180x] h-[40px] text-[32px] font-semibold" />
      </header>
    </div>
  );
}

export default Header;
