'use client';
import { VIEW_QUOTATION_GRAPH } from '@/app/constants/quotation';
import { callGet } from '@/app/utils/callApi';
import { useUser } from '@/app/utils/useUser';
import { useEffect, useState } from 'react';
import QuotationViewTableInfo from './QuotationViewTableInfo';

interface QuotationViewTableProps {
  viewType: CheckTypes;
}

const QuotationViewTable = ({ viewType }: QuotationViewTableProps) => {
  const { user } = useUser();
  const [quotation, setQuotation] = useState<QuotationTableInfoTypes | null>(
    null,
  );
  console.log(user?.result, '유저 정보');

  useEffect(() => {
    const fetchData = async () => {
      const url = `/api/quotation?id=${user?.result.client_id}&date=${viewType}`;
      const data = await callGet(url);
      setQuotation(data.result);
    };
    fetchData();
  }, [user, viewType]);

  return (
    <div className="w-full h-[710px]">
      <div className="flex items-center gap-x-20 text-xl font-bold h-10 mt-12 bg-[#F0F0F0] px-3">
        <div className="w-[93px] text-center">{VIEW_QUOTATION_GRAPH[0]}</div>
        <div className="w-[101px] text-center">{VIEW_QUOTATION_GRAPH[1]}</div>
        <div className="w-[222px] text-center">{VIEW_QUOTATION_GRAPH[2]}</div>
        <div className="w-[78px] text-center">{VIEW_QUOTATION_GRAPH[3]}</div>
      </div>
      <div className="w-full h-[0px] border-2 border-black" />
      <div className="flex flex-col w-full gap-y-1 mt-1">
        {quotation?.items.map((quoteView, index) => {
          return <QuotationViewTableInfo quoteView={quoteView} index={index} />;
        })}
      </div>
    </div>
  );
};

export default QuotationViewTable;
