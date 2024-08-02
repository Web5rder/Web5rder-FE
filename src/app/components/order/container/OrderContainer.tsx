'use client';

import { useEffect, useState } from 'react';
import Input from '../../common/Input';
import { SearchIcon } from '@/app/ui/iconPath';
import {
  BUTTON_TEXT,
  categoryMapping,
  DIALOG_TEXT,
  ORDER_TEXT,
} from '../../../constants/order';
import Icons from '../../common/Icons';
import { Dialog } from '../../common/Dialog';
import { callGet, callPost } from '@/app/utils/callApi';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/utils/useUser';
import { usePastOrder } from '@/app/utils/usePastOrder';
import ProductList from '../ProductList';
import QuotationModal from '../quotation/QuotationModal';

export default function OrderContainer() {
  const router = useRouter();
  const { user } = useUser(); // 커스텀 훅에서 user 가져오기
  const { pastOrder, getPastOrder } = usePastOrder(); // 커스텀 훅에서 즐겨찾기 가져오기

  const [state, setState] = useState({
    dialog: false,
    showBookmark: false,
    alert: false,
    search: '',
    bookmarkName: '',
    quotation: false,
  });
  const [searchResults, setSearchResults] = useState<ProductItemProps[]>([]); // 검색 결과
  const [addedItems, setAddedItems] = useState<ProductItemProps[]>([]); // 추가한 상품

  useEffect(() => {
    // 4005 상태 시 거래처 생성으로 이동
    if (user && !user.isSuccess && user.code === '4005') {
      setState((prev) => ({ ...prev, alert: true }));
    }
  }, [user]);

  // 즐겨 찾기에서 불러온 상품을 추가한 상품에 저장
  const setPastOrderId = async (past_order_id: string) => {
    try {
      const data = await callGet(`/api/order/get-past-order/${past_order_id}`);
      if (data.isSuccess) {
        const productList = data.result.product_list.map((product: any) => ({
          id: product.id,
          category: categoryMapping[product.category],
          name: product.name,
          unit: product.unit,
          price: product.price,
          count: product.count,
        }));
        setAddedItems(productList);
        setState((prev) => ({ ...prev, showBookmark: false }));
      }
    } catch (error) {
      console.error('클라이언트 에러', error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: any,
  ) => {
    const { value } = e.target;
    setState((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSearch = async () => {
    try {
      const search = state.search ? encodeURIComponent(state.search) : '""';
      const data = await callGet(
        `/api/order/search`,
        `name_prefix=${search}&limit=100&cached_time=300`,
      );
      setSearchResults(data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddBookMark = async () => {
    if (!state.bookmarkName) {
      alert(DIALOG_TEXT[2]);
      return;
    }
    try {
      const body = {
        client_id: user?.result.client_id,
        name: state.bookmarkName,
        product_ids: addedItems.map((item) => item.id),
      };

      await callPost('/api/order/post-past-order', body);

      await getPastOrder();
      setState((prev) => ({ ...prev, dialog: false, bookmarkName: '' }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddItem = (item: ProductItemProps) => {
    setAddedItems((prevItems) => {
      return [...prevItems, { ...item, count: item.count }];
    });
  };

  const handleRemoveItem = (id: string | undefined) => {
    setAddedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleCountChange = (id: string | undefined, count: string) => {
    setAddedItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, count } : item)),
    );
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
            <div className="absolute flex flex-col w-auto bg-white">
              {pastOrder.map((order) => (
                <button
                  key={order.past_order_id}
                  type="button"
                  className="px-4 py-1 border-b border-gray-2 cursor-pointer  border-t-[1px] border-2 "
                  onClick={() => setPastOrderId(order.past_order_id.toString())}
                >
                  {order.name}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex-center gap-2 bg-gray-0 border-2 border-gray-2 pr-1 focus-within:border-gray-7 focus-within:border-2">
          <Input
            textValue={state.search}
            type="search"
            onChange={(e) => handleInputChange(e, 'search')}
            placeholder={ORDER_TEXT[1]}
            onEnterPress={handleSearch}
          />
          <Icons onClick={handleSearch} name={SearchIcon} />
        </div>
        <p className="text-sm">{ORDER_TEXT[2]}</p>
      </div>

      <ProductList
        items={searchResults}
        isSearchResult
        addedItems={addedItems}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onCountChange={handleCountChange}
      />

      <ProductList
        items={addedItems}
        isSearchResult={false}
        onRemoveItem={handleRemoveItem}
        onCountChange={handleCountChange}
      />

      <div className="w-full flex justify-end gap-12 mt-4">
        <button
          onClick={() => {
            setState((prev) => ({ ...prev, dialog: true }));
          }}
          type="button"
          className="bg-primary-4 text-white text-xl px-3 py-1 font-black"
        >
          {ORDER_TEXT[7]}
        </button>

        <button
          onClick={() => {
            setState((prev) => ({ ...prev, quotation: true }));
          }}
          type="button"
          className="bg-primary-4 text-white text-xl px-3 py-1 font-black"
        >
          {ORDER_TEXT[4]}
        </button>
      </div>
      {state.alert && (
        <Dialog
          topText={DIALOG_TEXT[3]}
          BtnText={BUTTON_TEXT[0]}
          onBtnClick={() => {
            setState((prev) => ({ ...prev, alert: false }));
            router.push('/sign-in/client');
          }}
        />
      )}
      {state.dialog && (
        <Dialog
          isTwoButton
          topText={DIALOG_TEXT[4]}
          subText={DIALOG_TEXT[5]}
          BtnText={BUTTON_TEXT[1]}
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

      {state.quotation && (
        <QuotationModal
          QuotationModalData={addedItems}
          closeModal={() => {
            setState((prev) => ({ ...prev, quotation: false }));
          }}
        />
      )}
    </div>
  );
}
