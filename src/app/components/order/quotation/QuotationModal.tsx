'use client';

import { MODAL_INFO } from '@/app/constants/order';
import { cancelIcon } from '@/app/ui/iconPath';
import Icons from '../../common/Icons';
import QuotationSave from '../../quotation/modal/QuotationSave';
import QuotationTable from './QuotationTable';
import { useUser } from '@/app/utils/useUser';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useState, useEffect } from 'react';
import { callPost } from '@/app/utils/callApi';

interface QuotationModalProps {
  QuotationModalData: any;
  closeModal: () => void;
}

export default function QuotationModal({
  QuotationModalData,
  closeModal,
}: QuotationModalProps) {
  const { user } = useUser();
  const [currentDate, setCurrentDate] = useState('');
  const [quotationId, setQuotationId] = useState<number | null>(null);

  // 견적서 생성
  const createQuotations = async () => {
    try {
      const body = {
        client_id: user?.result.client_id,
        created_at: currentDate,
        status: 'CREATED',
      };
      const response = await callPost('/api/order/quotations', body);
      console.log(response);
      if (response.isSuccess && response.result) {
        return response.result.id;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  // 견적서 물품 생성
  const createProducts = async (id: number) => {
    try {
      const body = QuotationModalData.map((item: any) => ({
        quotation_id: id,
        product_id: item.id,
        quantity: item.count,
      }));

      const response = await callPost('/api/order/quotations/products', body);
      console.log('견적서 물품 생성 응답:', response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  }, []);

  useEffect(() => {
    const createQuotationAndProducts = async () => {
      if (currentDate && user?.result.client_id) {
        const id = await createQuotations();
        setQuotationId(id);
        if (id) {
          setQuotationId(id);
          await createProducts(id);
        }
      }
    };

    createQuotationAndProducts();
  }, [currentDate, user?.result.client_id]);

  useEffect(() => {
    console.log('견적서 ID', quotationId);
  }, [quotationId]);
  return (
    <div className="fixed inset-0 flex-center z-50 bg-black bg-opacity-30">
      <div className="flex flex-col w-[680px] h-[812px] rounded-3xl px-8 py-7 bg-white relative whitespace-nowrap">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className="self-end cursor-pointer" onClick={closeModal}>
          <Icons name={cancelIcon} />
        </div>
        <div className="w-full flex text-lg font-light">
          <span className="text-5xl font-bold mr-6">{MODAL_INFO[0]}</span>
          <div>
            <div className="flex gap-x-2">
              <span className="font-bold">{MODAL_INFO[1]}</span>
              <span>{currentDate}</span>
            </div>
            <div className="flex gap-x-2">
              <span className="font-bold">{MODAL_INFO[2]}</span>
              <span>{user?.result.email}</span>
            </div>
          </div>
        </div>

        <div className="w-full border-2 border-[#55aa00] mt-2.5" />

        <QuotationTable quotationInfo={QuotationModalData} />

        <div className="w-full mt-4 flex flex-col">
          <p>추가적인 문의 사항을 적어주세요</p>
          <div className="flex">
            <Input
              type="default"
              onChange={() => {}}
              className="w-full min-h-14 px-2 py-1 border-2"
            />
          </div>
        </div>

        <div className="absolute right-12 bottom-32 flex items-center font-extrabold">
          <span className="text-2xl mr-4">{MODAL_INFO[3]}</span>
          <div className="pl-4 border-double border-b-[7px] border-[#55aa00]">
            <span className="text-2xl sm:text-4xl font-bold text-end pb-1">
              1,000,000 원
            </span>
          </div>
        </div>
        <div className="absolute bottom-32">
          <QuotationSave />
        </div>

        <div className="flex flex-col absolute bottom-8 right-12 w-[calc(100%-6rem)]">
          견적서의 내용을 최종적으로 확인한 후 주문 확정을 눌러주세요
          <Button
            onClickHandler={() => {}}
            buttonText="주문 확정"
            type="default"
            className="bg-primary-3 text-white rounded-lg whitespace-nowrap font-extrabold text-xl py-2"
            isDisabled={false}
          />
        </div>
      </div>
    </div>
  );
}
