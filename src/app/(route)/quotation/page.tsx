'use client';

import { useState } from 'react';
import Input from '@/app/components/common/Input';

export default function Quotation() {
  const [inputState, setInputState] = useState({
    search: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputState((prev) => ({
      ...prev,
      search: value,
    }));
  };

  return (
    <section>
      <div className="bg-white w-full h-screen flex flex-col">
        {/* 네비게이션 바 */}
        <div className="absolute bg-primary-3 sm:w-26 lg:w-[160px] h-screen">
          <p className="pt-6 h-4 text-white font-black">정말맛있는푸드</p>
          <div className="mt-12 flex-center flex-col">
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
        <div className="sm:ml-28 lg:ml-[160px] mt-14 px-4 py-2">
          <div className="flex gap-4">
            <button
              className="bg-primary-4 text-lg font-black text-white px-2 py-1"
              type="button"
              onClick={() => {}}
            >
              최근주문목록
            </button>
            <Input
              className="bg-gray-0 md:w-64 lg:w-[580px] px-2 py-3 text-xl placeholder:text-xl placeholder:font-black"
              value={inputState.search}
              type="text"
              onChange={handleInputChange}
              placeholder="검색어를 입력해주세요"
            />
          </div>

          <div className="w-full bg-primary-4 mt-4">
            {/* 분류 품번 품명 단위 개수 */}
            <div className="flex justify-between text-white text-2xl font-black px-4 py-1">
              <div className="flex gap-14">
                <p>분류</p>
                <p>품번</p>
              </div>

              <p>품명</p>

              <div className="flex gap-8">
                <p>단위</p>
                <p>개수</p>
                <p>담기</p>
              </div>
            </div>

            {/* 목록창 */}
            <div className="bg-gray-0 px-4 h-80">하잉</div>
          </div>

          <div className="w-full bg-primary-4 mt-4">
            {/* 분류 품번 품명 단위 개수 */}
            <div className="flex text-white text-2xl font-black px-4 py-1">
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
