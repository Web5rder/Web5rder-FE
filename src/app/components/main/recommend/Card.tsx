'use client';

import Image from 'next/image';
import Button from '../../common/Button';

interface RecommendCardProps {
  itemName: string;
  amount: number;
  category: string;
}

function RecommendCard({ itemName, amount, category }: RecommendCardProps) {
  return (
    <div className="flex flex-col w-48 h-[291px] rounded-[20px] border-[2.5px] border-[#6ABE39] items-center pt-6 relative shadow-lg">
      <div>
        <Image
          src="/Images/logo.png"
          alt="카드 이미지"
          width={120}
          height={120}
        />
      </div>
      <div className="absolute top-[160px] left-[22px] text-3xl font-bold">
        {itemName}
      </div>
      <div className="absolute top-[190px] left-[22px] text-lg">
        총 {amount}개
      </div>
      <div className="absolute top-56 left-[35px]">
        <Button
          buttonText="바로구매"
          type="reorder"
          isDisabled={false}
          onClickHandler={() => console.log(category, '카테고리')}
        />
      </div>
    </div>
  );
}

export default RecommendCard;
