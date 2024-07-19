'use client';

import { useState } from 'react';
import Input from '@/app/components/common/Input';

export default function Quotation() {
  const [inputState, setInputState] = useState({
    search: '',
    count: '',
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
    <section>
      <div className="bg-white w-full h-screen flex relative">
        {/* 네비게이션 바 */}
        <div className="bg-primary-3 w-32">
          <p className="pt-6 h-4 text-white font-black">정말맛있는푸드</p>
          <div className="mt-12 flex-center flex-col cursor-pointer">
            <p className="flex-center h-9 w-full font-black text-white text-lg hover:bg-primary-4 border-b-[1px] border-gray-1">
              주문생성
            </p>
            <p className="flex-center h-9 w-full font-black text-white text-lg hover:bg-primary-4 border-b-[1px] border-gray-1">
              주문생성
            </p>
            <p className="flex-center h-9 w-full font-black text-white text-lg hover:bg-primary-4 border-b-[1px] border-gray-1">
              주문생성
            </p>
          </div>
        </div>

        {/* 탑바 */}
        <div className="fixed h-8 right-4 py-3 px-6 flex flex-col">
          <p>(주)현중푸드/성남시</p>
        </div>

        {/* 메인 컨테이너 */}
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
              className="bg-gray-0 md:w-96 px-2 py-1 text-xl font-black placeholder:text-xl placeholder:font-black"
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
              <div className="flex justify-between py-2 w-full text-gray-9 text-xl font-bold border-b-2">
                <div className="flex gap-4">
                  <p>냉동</p>
                  <p>SAM-572</p>
                </div>
                <p>하와이안피자 하와이안피자 하와이안피자</p>
                <div className="flex gap-10">
                  <Input
                    className="w-10 text-right"
                    placeholder="0"
                    value={inputState.count}
                    type="text"
                    onChange={(e) => handleInputChange(e, 'count')}
                  />
                  <p>kg</p>
                  <button
                    type="button"
                    className="bg-primary-4 text-white px-1"
                  >
                    담기
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-full bg-primary-4 mt-4 w-[540px]">
            {/* 분류 품번 품명 단위 개수 */}
            <div className="flex text-white text-xl font-black px-4 py-1">
              추가한 상품
            </div>

            <div className="bg-gray-0 px-4 h-48">하잉</div>
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
      </div>
    </section>
  );
}
