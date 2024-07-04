'use client';

import IncludedProducts from './IncludedProducts';

export default function Cart() {
  const productList = [1, 2, 3, 4];
  return (
    <div className="flex flex-col gap-4 items-center bg-fuchsia-100 p-4 mt-4">
      {productList.map((index) => (
        <IncludedProducts key={index} />
      ))}

      <button className="self-end bg-slate-50" type="submit" onClick={() => {}}>
        주문
      </button>
    </div>
  );
}
