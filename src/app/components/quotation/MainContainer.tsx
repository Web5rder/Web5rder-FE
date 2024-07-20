'use client';

import { useState } from 'react';
import Input from '../common/Input';
import ProductItem from './ProductItem';

export default function MainContainer() {
  const [inputState, setInputState] = useState({
    search: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: any,
  ) => {
    const { value } = e.target;
    setInputState((prev) => ({
      ...prev,
      [type]: value,
    }));
  };
  return (
    <div className="mt-14 px-4 py-2 w-full">
      <div className="flex gap-4">
        <button
          className="bg-primary-4 text-lg font-black text-white px-2 whitespace-nowrap"
          type="button"
          onClick={() => {}}
        >
          최근주문목록
        </button>
        <Input
          className="bg-gray-0 md:w-96 px-2 py-1 text-xl font-black border-2 border-gray-2 placeholder:text-xl placeholder:font-black"
          value={inputState.search}
          type="text"
          onChange={(e) => handleInputChange(e, 'search')}
          placeholder="검색어를 입력해주세요"
        />
      </div>

      <div className="md:w-full bg-primary-4 mt-4 w-[540px]">
        {/* 분류 품번 품명 단위 개수 */}
        <div className="flex justify-between text-white text-xl font-black pl-4 pr-5 py-1">
          <div className="flex gap-8">
            <p>분류</p>
            <p>품번</p>
          </div>
          <p>품명</p>
          <div className="flex gap-8">
            <p>개수</p>
            <p>단위</p>
            <p>담기</p>
          </div>
        </div>

        {/* 목록창 */}
        <div className="bg-white px-3 h-80 flex-col border-2 whitespace-nowrap">
          {/* 개별 목록 */}
          <ProductItem />
          <ProductItem />
        </div>
      </div>

      <div className="md:w-full bg-primary-4 mt-4 w-[540px]">
        {/* 분류 품번 품명 단위 개수 */}
        <div className="flex text-white text-xl font-black px-4 py-1">
          추가한 상품
        </div>

        <div className="bg-white px-3 h-48 flex-col border-2 whitespace-nowrap">
          <ProductItem />
        </div>
      </div>

      <div className="w-full flex justify-end mt-4">
        <button
          type="button"
          className="bg-primary-4 text-white text-2xl px-3 py-1 font-black"
        >
          주문
        </button>
      </div>
    </div>
  );
}
