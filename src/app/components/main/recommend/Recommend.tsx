import { RECOMMEND_TEXT } from '@/app/constants/main';

import CardSwiper from './CardSwiper';

function Recommend() {
  return (
    <div className="w-[1140px] h-[520px] flex flex-col">
      <div className="flex gap-x-2.5">
        <div className="rounded-full bg-[#28DE5A] w-8 h-8" />
        <div className="rounded-full bg-[#007C32] w-8 h-8" />
      </div>
      <div className="text-[42px] font-medium">{RECOMMEND_TEXT[0]}</div>
      <CardSwiper />
    </div>
  );
}

export default Recommend;
