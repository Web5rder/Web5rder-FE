import { WELCOME_TEXT } from '@/app/constants/main';
import Image from 'next/image';
import Link from 'next/link';

function Welcome() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative h-[400px] w-full mt-40 mb-[68px] font-extralight">
        <div className="absolute top-20 left-[134px] w-[540px] z-10 flex flex-wrap text-[48px]">
          <p>{WELCOME_TEXT[0]}</p>
          <p className="font-semibold">{WELCOME_TEXT[1]}</p>
          <p>{WELCOME_TEXT[2]}</p>
          <p className="font-semibold">{WELCOME_TEXT[3]}</p>
        </div>
        <Image src="/Images/mainImage.jpg" alt="배경" fill />
      </div>
      <Link
        href="/order"
        className="w-[680px] h-[60px] flex items-center justify-center text-white text-2xl bg-[#55AA00] rounded-[50px] shadow-md shadow-slate-400"
      >
        {WELCOME_TEXT[4]}
      </Link>
    </div>
  );
}

export default Welcome;
