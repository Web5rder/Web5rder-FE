'use client';

import { useState } from 'react';
import Input from '../common/Input';
import { QUOTATION_TEXT } from '@/app/constants/quotation';

export interface ProductItemProps {
  category: string;
  id?: string;
  name: string;
  count?: string;
  isAdded?: boolean;
  unit: string;
  onAddItem?: (item: ProductItemProps) => void;
  onRemoveItem?: (id: string | undefined) => void;
}

export default function ProductItem({
  category,
  id,
  name,
  count,
  isAdded,
  unit,
  onAddItem,
  onRemoveItem,
}: ProductItemProps) {
  const [inputState, setInputState] = useState({
    count: count || '1',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: any,
  ) => {
    let { value } = e.target;
    if (type === 'count') {
      const numericValue = parseInt(value, 10);
      if (Number.isNaN(numericValue) || numericValue <= 0) {
        value = '1'; // 0 이하의 값일 경우 1로 설정
      }
    }
    setInputState((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleButtonClick = () => {
    if (isAdded) {
      onRemoveItem?.(id);
    } else {
      onAddItem?.({ category, id, name, count: inputState.count, unit });
    }
  };

  return (
    <div className="flex items-center pl-1 py-2 w-full text-gray-9 font-bold border-b-2">
      <div className="w-[7%] pl-4 overflow-hidden text-ellipsis whitespace-nowrap">
        {category}
      </div>
      <div className="w-[7%] overflow-hidden text-ellipsis whitespace-nowrap">
        {id}
      </div>
      <div className="w-[60%] pl-4 overflow-hidden text-ellipsis whitespace-nowrap">
        {name}
      </div>
      <div className="w-[10%] flex items-center justify-center">
        <Input
          className="w-16 text-center"
          placeholder="1"
          textValue={inputState.count || 1}
          type="count"
          inputType="number"
          onChange={(e) => handleInputChange(e, 'count')}
        />
      </div>
      <div className="w-[8%] text-right pr-2 overflow-hidden text-ellipsis whitespace-nowrap">
        {unit}
      </div>
      <div className="w-[8%] flex justify-end pr-4">
        <button
          type="button"
          className={`${isAdded ? 'bg-red-1' : 'bg-primary-4'} text-white px-2 py-1`}
          onClick={handleButtonClick}
        >
          {isAdded ? QUOTATION_TEXT[5] : QUOTATION_TEXT[6]}
        </button>
      </div>
    </div>
  );
}
