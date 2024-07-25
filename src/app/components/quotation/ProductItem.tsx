'use client';

import { useState } from 'react';
import Input from '../common/Input';
import { QUOTATION_TEXT } from '@/app/constants/quotation';

export interface ProductItemProps {
  category: string;
  code?: string;
  name: string;
  count?: string;
  isAdded?: boolean;
  onAddItem?: (item: ProductItemProps) => void;
  onRemoveItem?: (code: string | undefined) => void;
}

export default function ProductItem({
  category,
  code,
  name,
  count,
  isAdded,
  onAddItem,
  onRemoveItem,
}: ProductItemProps) {
  const [inputState, setInputState] = useState({
    count: count || '',
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

  const handleButtonClick = () => {
    if (isAdded) {
      onRemoveItem?.(code);
    } else {
      onAddItem?.({ category, code, name, count: inputState.count });
    }
  };

  return (
    <div className="flex justify-between py-2  w-full text-gray-9 text-xl font-bold border-b-2">
      <div className="flex gap-4">
        <p>{category}</p>
        <p>{code}</p>
      </div>
      <p>{name}</p>
      <div className="flex gap-8">
        <Input
          className=""
          placeholder="1"
          textValue={inputState.count}
          type="count"
          onChange={(e) => handleInputChange(e, 'count')}
        />
        <p>kg</p>
        <button
          type="button"
          className={`${isAdded ? 'bg-red-1' : 'bg-primary-4'} text-white px-1`}
          onClick={handleButtonClick}
        >
          {isAdded ? QUOTATION_TEXT[5] : QUOTATION_TEXT[6]}
        </button>
      </div>
    </div>
  );
}
