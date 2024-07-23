'use client';

import { useEffect, useState } from 'react';
import Input from '../common/Input';
import ProductItem, { ProductItemProps } from './ProductItem';
import Icons from '../Icons';
import { SearchIcon } from '@/app/ui/iconPath';

export default function MainContainer() {
  const [token, setToken] = useState('');
  useEffect(() => {
    const JMFtoken = localStorage.getItem('JMFtoken');
    if (JMFtoken) {
      setToken(JMFtoken);
    }
  }, []);

  const [inputState, setInputState] = useState({
    search: '',
  });

  const [searchResults, setSearchResults] = useState<ProductItemProps[]>([]);
  const [addedItems, setAddedItems] = useState<ProductItemProps[]>([]);

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

  const handleSearch = async () => {
    try {
      const search = encodeURIComponent(inputState.search);
      console.log(`Search query: ${search}`);
      const response = await fetch(
        `/api/quotation?name_prefix=${search}&limit=100&cached_time=300`,
        {
          method: 'GET',
          headers: {
            'access-token': token,
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      console.log(searchResults);
      console.log(`Search results: ${JSON.stringify(data.result)}`);
      setSearchResults(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = (item: ProductItemProps) => {
    setAddedItems((prevItems) => {
      // const existingItem = prevItems.find(
      //   (prevItem) => prevItem.code === item.code,
      // );
      // // if (existingItem) {
      // //   alert('이미 추가한 상품입니다.');
      // //   return prevItems;
      // // }
      return [...prevItems, { ...item, count: item.count || '1' }];
    });
  };

  const handleRemoveItem = (code: string | undefined) => {
    setAddedItems((prevItems) =>
      prevItems.filter((item) => item.code !== code),
    );
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
        <div className="flex-center gap-2 bg-gray-0 border-2 border-gray-2 pr-1 focus-within:border-gray-7 focus-within:border-2">
          <Input
            textValue={inputState.search}
            type="search"
            onChange={(e) => handleInputChange(e, 'search')}
            placeholder="검색어를 입력해주세요"
            onEnterPress={handleSearch}
          />
          <Icons onClick={handleSearch} name={SearchIcon} />
        </div>
        <p className="self-center font-bold">
          상품 검색 후 개수를 입력한 뒤에 &apos;담기&apos;를 눌러주세요.
        </p>
      </div>

      <div className="md:w-full bg-primary-4 mt-4 w-[540px]">
        {/* 분류 품번 품명 단위 개수 */}
        <div className="flex justify-between text-white text-xl font-black pl-4 pr-9 py-1">
          <div className="flex gap-8">
            <p>분류</p>
            <p>품번</p>
          </div>
          <p className="pl-6">품명</p>
          <div className="flex gap-8">
            <p>개수</p>
            <p>단위</p>
            <p>담기</p>
          </div>
        </div>

        {/* 목록창 */}
        <div className="bg-white px-3 h-80 flex-col border-2 whitespace-nowrap overflow-scroll">
          {/* 개별 목록 */}
          {[
            { category: '냉장', code: 'SAM-572', name: '하와이안피자' },
            { category: '냉동', code: 'SAM-573', name: '민트초코' },
            { category: '냉동', code: 'SAM-574', name: '데자와' },
            { category: '냉동', code: 'SAM-575', name: '맥콜' },
            { category: '냉동', code: 'SAM-576', name: '솔의눈' },
            { category: '냉동', code: 'SAM-577', name: '닥터페퍼' },
            { category: '냉동', code: 'SAM-578', name: '마라탕' },
            { category: '냉동', code: 'SAM-579', name: '탕후루' },
            { category: '냉장', code: 'SAM-580', name: '두바이 초콜릿' },
            { category: '냉동', code: 'SAM-581', name: '요아정' },
            { category: '냉동', code: 'SAM-582', name: '아망추' },
            { category: '냉동', code: 'SAM-583', name: '크루키' },
            { category: '냉장', code: 'SAM-584', name: '점보라면' },
            { category: '냉장', code: 'SAM-585', name: '짬뽕' },
          ].map((item) => (
            <ProductItem
              key={item.code}
              category={item.category}
              code={item.code}
              name={item.name}
              isAdded={
                !!addedItems.find((addedItem) => addedItem.code === item.code)
              }
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />
          ))}
        </div>
      </div>

      <div className="md:w-full bg-primary-4 mt-4 w-[540px]">
        {/* 분류 품번 품명 단위 개수 */}
        <div className="flex text-white text-xl font-black px-4 py-1">
          추가한 상품
        </div>

        <div className="bg-white px-3 h-48 flex-col border-2 whitespace-nowrap overflow-scroll">
          {addedItems.map((item) => (
            <ProductItem
              key={item.code}
              category={item.category}
              code={item.code}
              name={item.name}
              count={item.count || '1'}
              isAdded
              onRemoveItem={handleRemoveItem}
            />
          ))}
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
