import { MODAL_TEXT } from '@/app/constants/quotation';

interface QuotationTableProps {
  quotationInfo: QuotationInfoTypes;
}

const QuotationTable = ({ quotationInfo }: QuotationTableProps) => {
  return (
    <div className="w-[600px] h-[410px]">
      <div className="flex gap-x-3 text-xl font-semibold h-8 pl-10 mt-[76px]">
        <div className="w-40 text-center">{MODAL_TEXT[0]}</div>
        <div className="w-28 text-center">{MODAL_TEXT[1]}</div>
        <div className="w-[130px] text-center">{MODAL_TEXT[2]}</div>
        <div className="w-[90px] text-center">{MODAL_TEXT[3]}</div>
      </div>
      <div className="w-[602px] h-[0px] border-2 border-black" />
      <div className="flex flex-col w-[612px] h-[37px] gap-y-2 mt-2">
        {quotationInfo.products.map((itemData, index) => {
          return (
            <div key={itemData.product}>
              <div className="w-[598px] h-9 pl-1 justify-start items-center gap-x-[22px] inline-flex ">
                <div className="w-[34px] text-center">{index}</div>
                <div className="w-[122px] text-center">
                  {itemData.created_at}
                </div>
                <div className="w-[137px] text-center">{itemData.product}</div>
                <div className="w-[82px] text-center">{itemData.quantity}</div>
                <div className="w-[117px] text-center">{itemData.price}</div>
              </div>
              <div className="w-[612px] h-[0px] border border-black" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuotationTable;
