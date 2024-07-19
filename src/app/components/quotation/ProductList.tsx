'use client';

import { useState } from 'react';
import Input from '../common/Input';

export default function ProductList() {
  const [inputState, setInputState] = useState({
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
        <button type="button" className="bg-primary-4 text-white px-1">
          담기
        </button>
      </div>
    </div>
  );
}
