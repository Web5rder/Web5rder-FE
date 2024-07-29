'use client';

import { useEffect, useState } from 'react';
import Input from '../common/Input';
import { SearchIcon } from '@/app/ui/iconPath';
import {
  categoryMapping,
  PRODUCT_TEXT,
  ORDER_TEXT,
} from '../../constants/order';
import Icons from '../common/Icons';
import { Dialog } from '../common/Dialog';
import { callGet, callPost } from '@/app/utils/callApi';
import ProductItem, { ProductItemProps } from './ProductItem';

export default function MainContainer() {
  const [user, setUser] = useState<User | null>();
  const [pastOrder, setPastOrder] = useState<PastOrder[]>([]);
  const getUsers = async () => {
    try {
      const data = await callGet('/api/order/users');
      setUser(data);
    } catch (error) {
      console.error('클라이언트 에러', error);
    }
  };

  console.log(user);

  const getPastOrder = async () => {
    try {
      const client_id = user?.result.client_id;

      const data = await callGet(`/api/order/${client_id}/get-past-order`);
      setPastOrder(data.result);
      console.log(pastOrder);
    } catch (error) {
      console.error('클라이언트 에러', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (user?.result?.client_id) {
      getPastOrder();
      console.log(pastOrder);
    }
  }, [user]);

  const [inputState, setInputState] = useState({
    search: '',
  });
  const [state, setState] = useState({
    dialog: false,
    showBookmark: false,
    bookmarkName: '',
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
      const search = inputState.search
        ? encodeURIComponent(inputState.search)
        : '""';
      const data = await callGet(
        `/api/order/search`,
        `name_prefix=${search}&limit=100&cached_time=300`,
      );
      console.log(`검색 결과: ${JSON.stringify(data.result)}`);
      setSearchResults(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddBookMark = async () => {
    if (!state.bookmarkName) {
      alert('즐겨찾기 이름을 입력해주세요');
      return;
    }
    try {
      const body = {
        client_id: user?.result.client_id,
        name: state.bookmarkName,
        product_ids: addedItems.map((item) => item.id),
      };

      console.log('즐겨찾기 생성', body);
      const responseData = await callPost('/api/order/post-past-order', body);
      console.log('리스폰스데이터', responseData);

      await getPastOrder();
      setState((prev) => ({ ...prev, dialog: false, bookmarkName: '' }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = (item: ProductItemProps) => {
    setAddedItems((prevItems) => {
      return [...prevItems, { ...item, count: item.count || '1' }];
    });
  };

  const handleRemoveItem = (id: string | undefined) => {
    setAddedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="mt-14 px-24 py-2 w-full min-w-[320px]">
      <div className="flex gap-4 items-center">
        <div>
          <button
            className="bg-primary-4 self-center font-black text-white px-2 py-1 whitespace-nowrap"
            type="button"
            onClick={() => {
              setState((prev) => ({
                ...prev,
                showBookmark: !prev.showBookmark,
              }));
            }}
          >
            {ORDER_TEXT[0]}
          </button>
          {state.showBookmark && (
            <div className="absolute w-auto bg-white border-t-[1px] border-2 border-gray-2">
              {pastOrder.map((order) => (
                <div
                  key={order.past_order_id}
                  className="px-4 py-1 border-b border-gray-2 cursor-pointer last:border-none"
                >
                  {order.name}
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
            placeholder={ORDER_TEXT[1]}
            onEnterPress={handleSearch}
          />
          <Icons onClick={handleSearch} name={SearchIcon} />
        </div>
        <p className="text-sm">{ORDER_TEXT[2]}</p>
      </div>

      <div className="bg-primary-4 mt-4 w-full ">
        {/* 분류 품번 품명 단위 개수 */}
        <div className="flex text-white font-black py-1 pl-4 pr-6 whitespace-nowrap">
          <div className="w-[7%] pl-4">{PRODUCT_TEXT[0]}</div>
          <div className="w-[7%]">{PRODUCT_TEXT[1]}</div>
          <div className="w-[60%] pl-4">{PRODUCT_TEXT[2]}</div>
          <div className="w-[10%] text-center">{PRODUCT_TEXT[3]}</div>
          <div className="w-[8%] text-right pr-2">{PRODUCT_TEXT[4]}</div>
          <div className="w-[8%] text-right pr-8">{PRODUCT_TEXT[5]}</div>
        </div>

        {/* 목록창 */}
        <div className="bg-white px-3 h-80 flex-col border-2 whitespace-nowrap overflow-scroll">
          {/* 개별 목록 */}
          {searchResults.map((item) => (
            <ProductItem
              key={item.id}
              category={categoryMapping[item.category]}
              id={item.id}
              name={item.name}
              isAdded={
                !!addedItems.find((addedItem) => addedItem.id === item.id)
              }
              unit={item.unit}
              onAddItem={handleAddItem}
              onRemoveItem={handleRemoveItem}
            />
          ))}
        </div>
      </div>

      <div className="w-full bg-primary-4 mt-4 ">
        {/* 분류 품번 품명 단위 개수 */}
        <div className="flex text-white font-black px-4 py-1">
          {ORDER_TEXT[3]}
        </div>

        <div className="bg-white px-3 h-48 flex-col border-2 whitespace-nowrap overflow-scroll">
          {addedItems.map((item) => (
            <ProductItem
              key={item.id}
              category={item.category}
              id={item.id}
              name={item.name}
              count={item.count || '1'}
              isAdded
              unit={item.unit}
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
          className="bg-primary-4 text-white text-xl px-3 py-1 font-black"
        >
          즐겨찾기 추가
        </button>

        <button
          type="button"
          className="bg-primary-4 text-white text-xl px-3 py-1 font-black"
        >
          {ORDER_TEXT[4]}
        </button>
      </div>
      {state.dialog && (
        <Dialog
          isTwoButton
          topText="즐겨찾기 이름을 적어주세요"
          subText="현재 추가한 상품으로 즐겨찾기가 만들어집니다"
          onSubBtnClick={() => {
            setState((prev) => ({ ...prev, dialog: false, bookmarkName: '' })); // 다이얼로그를 닫을 때 입력값 초기화
          }}
          onBtnClick={handleAddBookMark}
          hasInput
          value={state.bookmarkName}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              bookmarkName: e.target.value.slice(0, 10), // 10자 제한
            }))
          }
        />
      )}
    </div>
  );
}
