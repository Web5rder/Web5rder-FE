'use client';
import { QUOTATION } from '@/app/constants/quotation';
import { QuoteViewData } from '@/app/constants/test';
import { useState } from 'react';
import QuotationViewTable from '../QuotationViewTable';

const QuotationContainer = () => {
  const [checkType, setCheckType] = useState<CheckTypes>('week');
  const checkStyle = 'flex-center rounded-3xl cursor-pointer';
  const bg = (checked: CheckTypes) =>
    checkType === checked ? 'bg-primary-3' : 'bg-gray-3';
  return (
    <div className="w-full flex justify-center pt-24">
      <div className="w-[1024px] flex flex-col">
        <div className="flex w-full justify-between h-10">
          <p className="text-4xl font-bold ">{QUOTATION[0]}</p>
          <div className="flex text-white text-xl font-medium gap-x-4">
            <div
              className={`w-[58px] ${checkStyle} ${bg('week')} `}
              onClick={() => setCheckType('week')}
            >
              {QUOTATION[1]}
            </div>
            <div
              className={`w-[58px] ${checkStyle} ${bg('month')}`}
              onClick={() => setCheckType('month')}
            >
              {QUOTATION[2]}
            </div>
            <div
              className={`w-[180px] ${checkStyle} ${bg('date')}`}
              onClick={() => setCheckType('date')}
            >
              {QUOTATION[3]}
            </div>
          </div>
        </div>
        <QuotationViewTable quotationViewInfo={QuoteViewData} />
      </div>
    </div>
  );
};

export default QuotationContainer;
