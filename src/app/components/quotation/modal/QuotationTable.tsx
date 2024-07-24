import { MODAL_TEXT } from '@/app/constants/quotation';

const QuotationTable = () => {
  return (
    <div className="w-[600px] h-[410px] flex-col">
      <div className="flex gap-x-3 text-xl font-semibold h-8 pl-10 mt-[76px]">
        <div className="w-40 text-center">{MODAL_TEXT[0]}</div>
        <div className="w-28 text-center">{MODAL_TEXT[1]}</div>
        <div className="w-[130px] text-center">{MODAL_TEXT[2]}</div>
        <div className="w-[90px] text-center">{MODAL_TEXT[3]}</div>
      </div>
      <div className="w-[602px] h-[0px] border-2 border-black"></div>
      <div className="flex flex-col w-[612px] h-[37px] gap-y-2 mt-2">
        {mookData.map((itemData, index) => {
          return (
            <div>
              <div className="w-[598px] h-9 pl-1 justify-start items-center gap-x-[22px] inline-flex ">
                <div className="w-[34px] text-center">{index}</div>
                <div className="w-[122px] text-center">
                  {itemData.created_at}
                </div>
                <div className="w-[137px] text-center">{itemData.product}</div>
                <div className="w-[82px] text-center">{itemData.quantity}</div>
                <div className="w-[117px] text-center">{itemData.price}</div>
              </div>
              <div className="w-[612px] h-[0px] border border-black"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuotationTable;

const mookData = [
  {
    product: '초당옥수수',
    quantity: 12,
    price: 25000,
    created_at: '2024. 07. 06',
    updated_at: '2024. 07. 06',
  },
  {
    product: '초당옥수수',
    quantity: 12,
    price: 25000,
    created_at: '2024. 07. 06',
    updated_at: '2024. 07. 06',
  },
  {
    product: '초당옥수수',
    quantity: 12,
    price: 25000,
    created_at: '2024. 07. 06',
    updated_at: '2024. 07. 06',
  },
  {
    product: '초당옥수수',
    quantity: 12,
    price: 25000,
    created_at: '2024. 07. 06',
    updated_at: '2024. 07. 06',
  },
  {
    product: '초당옥수수',
    quantity: 12,
    price: 25000,
    created_at: '2024. 07. 06',
    updated_at: '2024. 07. 06',
  },
  {
    product: '초당옥수수',
    quantity: 12,
    price: 25000,
    created_at: '2024. 07. 06',
    updated_at: '2024. 07. 06',
  },
  {
    product: '초당옥수수',
    quantity: 12,
    price: 25000,
    created_at: '2024. 07. 06',
    updated_at: '2024. 07. 06',
  },
];
