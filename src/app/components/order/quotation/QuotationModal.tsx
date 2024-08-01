'use client';

import { MODAL_INFO } from '@/app/constants/order';
import { cancelIcon } from '@/app/ui/iconPath';
import Icons from '../../common/Icons';
import QuotationSave from '../../quotation/modal/QuotationSave';
import QuotationTable from './QuotationTable';
import { useUser } from '@/app/utils/useUser';
import Button from '../../common/Button';
import Input from '../../common/Input';
import { useState, useEffect, ChangeEvent } from 'react';
import { callGet, callPatch, callPost } from '@/app/utils/callApi';
import { Dialog } from '../../common/Dialog';
import { useRouter } from 'next/navigation';

const formatNumber = (number: number) => {
  return new Intl.NumberFormat('ko-KR').format(number);
};

export default function QuotationModal({
  QuotationModalData,
  closeModal,
}: QuotationModalProps) {
  const { user } = useUser();
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState('');
  const [quotationId, setQuotationId] = useState<number | null>(null);
  const [total, setTotal] = useState(0);
  const [partiValue, setPartiValue] = useState('');
  const [dialog, setDialog] = useState(false);

  // 견적서 생성
  const createQuotations = async () => {
    try {
      const body = {
        client_id: user?.result.client_id,
        created_at: currentDate,
        status: 'CREATED',
      };
      const response = await callPost('/api/order/quotations', body);

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

      await callPost('/api/order/quotations/products', body);
    } catch (error) {
      console.error(error);
    }
  };

  // 견적서 합계 금액 업데이트
  const updateTotal = async (quotation_id: number) => {
    try {
      const data = await callGet(`/api/order/quotations/${quotation_id}/total`);
      if (data.isSuccess) {
        setTotal(data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 오늘 날짜 불러오기
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
  }, []);

  // 견적서 완성
  useEffect(() => {
    const completeQuotation = async () => {
      if (currentDate && user?.result.client_id) {
        try {
          // 1. 견적서 생성
          const id = await createQuotations();
          if (!id) {
            console.error('견적서 생성 실패');
            return;
          }
          setQuotationId(id);

          // 2. 견적서 물품 생성
          await createProducts(id);

          // 3. 견적서 합계 금액 업데이트
          await updateTotal(id);
        } catch (error) {
          console.error('견적서 생성 중 오류 발생 : ', error);
        }
      }
    };

    // 견적서 완성
    completeQuotation();
  }, [currentDate, user?.result.client_id]);

  // 견적서 특이사항 작성 onChange
  const handlePartiChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parti = e.target.value;
    setPartiValue(parti);
  };

  // 견적서 특이사항 작성
  const patchParticulars = async () => {
    try {
      const particulars = partiValue;
      await callPatch(
        `/api/order/quotations/${quotationId}/particulars`,
        `particulars=${particulars}`,
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 견적서 작성 확정
  const patchConfirm = async () => {
    try {
      await callPatch(`/api/order/quotations/${quotationId}/confirmation`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmQuotation = async () => {
    try {
      // 4. 견적서 특이사항 전송
      await patchParticulars();
      // 5. 견적서 작성 확정
      await patchConfirm();

      setDialog(true);
    } catch (error) {
      console.error('견적서 확정 중 오류 발생 : ', error);
    }
  };
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
              onChange={(e) => {
                handlePartiChange(e);
              }}
              className="w-full min-h-14 px-2 py-1 border-2"
              textValue={partiValue}
            />
          </div>
        </div>

        <div className="absolute right-12 bottom-32 flex items-center font-extrabold">
          <span className="text-2xl mr-4">{MODAL_INFO[3]}</span>
          <div className="pl-4 border-double border-b-[7px] border-[#55aa00]">
            <span className="text-2xl sm:text-4xl font-bold text-end pb-1">
              {formatNumber(total)} 원
            </span>
          </div>
        </div>
        <div className="absolute bottom-32">
          <QuotationSave />
        </div>

        <div className="flex flex-col absolute bottom-8 right-12 w-[calc(100%-6rem)]">
          견적서의 내용을 최종적으로 확인한 후 주문 확정을 눌러주세요
          <Button
            onClickHandler={handleConfirmQuotation}
            buttonText="주문 확정"
            type="default"
            className="bg-primary-3 text-white rounded-lg whitespace-nowrap font-extrabold text-xl py-2"
            isDisabled={false}
          />
        </div>

        {dialog && (
          <Dialog
            topText="견적서가 제출되었습니다."
            BtnText="닫기"
            onBtnClick={() => {
              setDialog(false);
              router.push('/quotation');
            }}
          />
        )}
      </div>
    </div>
  );
}
