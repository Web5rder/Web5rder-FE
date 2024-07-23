import Image from 'next/image';
import Link from 'next/link';
import { HEADER_TEXT } from '@/app/constants/common';

function Header() {
  return (
    <div className="relative w-full border-b-2">
      <header className="relative w-full h-[74px] flex items-center px-20 drop-shadow-lg">
        <div className="absolute left-40">
          <Image src="/Images/logo.png" width={64} height={64} alt="logo" />
        </div>
        <div className="flex gap-x-10 items-center justify-center w-full font-normal text-2xl ml-12 mr-40 ">
          <Link href="/">{HEADER_TEXT[0]}</Link>
          <Link href="/">{HEADER_TEXT[1]}</Link>
          <Link href="/">{HEADER_TEXT[2]}</Link>
          <Link href="/">{HEADER_TEXT[3]}</Link>
        </div>
        <div className="flex gap-x-3 h-full items-end mb-3 font-semibold text-lg text-[#6ABE39] absolute right-40">
          <Link href="/">{HEADER_TEXT[4]}</Link>
          <Link href="/">{HEADER_TEXT[5]}</Link>
        </div>
        <div className="flex w-[180x] h-[40px] text-[32px] font-semibold" />
      </header>
    </div>
  );
}

export default Header;
