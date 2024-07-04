'use client';

export default function PurchaseForm() {
  return (
    <div className="flex flex-col gap-4 items-center w-full h-auto bg-fuchsia-100 p-4">
      <input className="self-end" placeholder="상품검색" />
      <div className="w-full flex flex-col gap-3">
        <div className="flex w-full justify-evenly">
          <input placeholder="상품 카테고리" />
          <input placeholder="상품명" />
        </div>

        <div className="flex w-full justify-evenly">
          <input placeholder="품번 (자동입력)" />
          <input placeholder="제조사" />
        </div>

        <div className="flex w-full justify-evenly">
          <input placeholder="단위" />
          <input placeholder="개수" />
        </div>
      </div>

      <button className="self-end bg-slate-50" type="submit" onClick={() => {}}>
        담기
      </button>
    </div>
  );
}
