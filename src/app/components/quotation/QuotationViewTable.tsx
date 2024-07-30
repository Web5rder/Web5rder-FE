import { VIEW_QUOTATION_GRAPH } from '@/app/constants/quotation';

interface QuotationViewTableProps {
  quotationViewInfo: QuotationViewInfoTypes[];
}

const QuotationViewTable = ({ quotationViewInfo }: QuotationViewTableProps) => {
  return (
    <div className="w-full h-[710px]">
      <div className="flex items-center gap-x-20 text-xl font-bold h-10 mt-12 bg-[#F0F0F0] px-3">
        <div className="w-[93px] text-center">{VIEW_QUOTATION_GRAPH[0]}</div>
        <div className="w-[101px] text-center">{VIEW_QUOTATION_GRAPH[1]}</div>
        <div className="w-[222px] text-center">{VIEW_QUOTATION_GRAPH[2]}</div>
        <div className="w-[78px] text-center">{VIEW_QUOTATION_GRAPH[3]}</div>
      </div>
      <div className="w-full h-[0px] border-2 border-black" />
      <div className="flex flex-col w-full h-[37px] gap-y-2 mt-2">
        {quotationViewInfo.map((quoteView, index) => {
          return (
            <div key={quoteView.id}>
              <div className="w-full h-9 pl-1 justify-start items-center gap-x-[20px] inline-flex ">
                <div className="w-[108px] text-center">{index + 1}</div>
                <div className="w-[200px] text-center">
                  {quoteView.created_at}
                </div>
                <div className="w-[250px] text-center">
                  {quoteView.updated_at}
                </div>
                <div className="w-[170px] text-center">
                  {quoteView.total_price}원
                </div>
                <div className="w-[58px] text-center cursor-pointer text">{'조회'}</div>
                <div className="w-[58px] text-center cursor-pointer">{'수정'}</div>
              </div>
              <div className="w-full h-[0px] border border-black" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuotationViewTable;
