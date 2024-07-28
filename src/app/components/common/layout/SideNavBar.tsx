import {
  SIDENAV_ICONS,
  SIDENAV_PATH,
  SIDENAV_TEXT,
} from '@/app/constants/common';
import Image from 'next/image';
import Link from 'next/link';
import Icons from '../Icons';

export default function SideNavBar() {
  return (
    <div className="bg-white w-48 whitespace-nowrap pt-9 flex flex-col items-center">
      <Link href={'/'}>
        <Image src={'/Images/JMF2.png'} alt={'로고'} width={100} height={75} />
      </Link>
      <div className="w-40 mt-[52px] flex ml-7 justify-center flex-col gap-y-7 text-[22px] text-[#737373] font-bold">
        {SIDENAV_PATH.map((path, i) => {
          return (
            <div key={path} className="flex items-center gap-x-2 h-9">
              <Icons name={SIDENAV_ICONS[i]} />
              <Link href={path}>{SIDENAV_TEXT[i]}</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
