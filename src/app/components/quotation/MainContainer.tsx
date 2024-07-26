'use client';

import { useEffect, useState } from 'react';
import Input from '../common/Input';
import ProductItem, { ProductItemProps } from './ProductItem';
import { SearchIcon } from '@/app/ui/iconPath';
import { PRODUCT_TEXT, QUOTATION_TEXT } from '../../constants/quotation';
import Icons from '../common/Icons';
import { Dialog } from '../common/Dialog';

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
    bookmark: '',
  });

  const [state, setState] = useState({
    dialog: false,
    showBookmark: false,
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
        `/api/quotation/search?name_prefix=${search}&limit=100&cached_time=300`,
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

  const handleAddBookMark = async () => {
    try {
      const { bookmark } = inputState;
      const body = {
        client_id: 1, // 임시데이터
        name: bookmark,
        product_ids: addedItems.map((item) => item.code), // 임시데이터
      };
      const response = await fetch('/api/quotation/post-past-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body }),
      });

      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = (item: ProductItemProps) => {
    setAddedItems((prevItems) => {
      return [...prevItems, { ...item, count: item.count || '1' }];
    });
  };

  const handleRemoveItem = (code: string | undefined) => {
    setAddedItems((prevItems) =>
      prevItems.filter((item) => item.code !== code),
    );
  };

  const getUsers = async (mytoken: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_SERVER}/api/quotation/users`,
        {
          method: 'GET',
          headers: {
            'access-token': mytoken,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('클라이언트 에러', error);
    }
  };

  useEffect(() => {
    if (token) {
      getUsers(token);
    }
  }, [token]);
  return (
    <div className="mt-14 px-8 py-2 w-full">
      <div className="flex gap-4">
        <div>
          <button
            className="bg-primary-4 text-lg font-black text-white px-2 py-1 whitespace-nowrap"
            type="button"
            onClick={() => {
              setState((prev) => ({
                ...prev,
                showBookmark: !prev.showBookmark,
              }));
            }}
          >
            {QUOTATION_TEXT[0]}
          </button>
          {state.showBookmark && (
            <div className="absolute w-auto bg-white border-t-[1px] border-2 border-gray-2">
              {['북마크', '북마크2', '북마크북마크북마크'].map((i) => (
                <div
                  key={i}
                  className="px-4 py-1 border-b border-gray-2 cursor-pointer last:border-none"
                >
                  {i}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex-center gap-2 bg-gray-0 border-2 border-gray-2 pr-1 focus-within:border-gray-7 focus-within:border-2">
          <Input
            textValue={inputState.search}
            type="search"
            onChange={(e) => handleInputChange(e, 'search')}
            placeholder={QUOTATION_TEXT[1]}
            onEnterPress={handleSearch}
          />
          <Icons onClick={handleSearch} name={SearchIcon} />
        </div>
        <p className="self-center font-bold">{QUOTATION_TEXT[2]}</p>
      </div>

      <div className="md:w-full bg-primary-4 mt-4 w-[540px] ">
        {/* 분류 품번 품명 단위 개수 */}
        <div className="flex justify-between text-white text-xl font-black pl-4 pr-9 py-1">
          <div className="flex gap-8">
            <p>{PRODUCT_TEXT[0]}</p>
            <p>{PRODUCT_TEXT[1]}</p>
          </div>
          <p className="pl-6">{PRODUCT_TEXT[2]}</p>
          <div className="flex gap-8">
            <p>{PRODUCT_TEXT[3]}</p>
            <p>{PRODUCT_TEXT[4]}</p>
            <p>{PRODUCT_TEXT[5]}</p>
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
          {QUOTATION_TEXT[3]}
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

      <div className="w-full flex justify-end gap-12 mt-4">
        <button
          onClick={() => {
            setState((prev) => ({ ...prev, dialog: true }));
          }}
          type="button"
          className="bg-primary-4 text-white text-2xl px-3 py-1 font-black"
        >
          즐겨찾기 추가
        </button>

        <button
          type="button"
          className="bg-primary-4 text-white text-2xl px-3 py-1 font-black"
        >
          {QUOTATION_TEXT[4]}
        </button>
      </div>
      {state.dialog && (
        <Dialog
          isTwoButton
          topText="북마크 이름을 적어주세요"
          onSubBtnClick={() => {
            setState((prev) => ({ ...prev, dialog: false }));
          }}
          onBtnClick={handleAddBookMark}
          hasInput
          onChange={(e) => handleInputChange(e, 'bookmark')}
        />
      )}
    </div>
  );
}
