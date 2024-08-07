'use client';

import { callDelete, callGet, callPatch } from '@/app/utils/callApi';
import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';

export default function AdminContainer() {
  const [state, setState] = useState({
    clientId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState((prev) => ({
      ...prev,
      clientId: value,
    }));
  };

  // 견적서 조회
  const handleInquiryClientQuotation = async (client_id: string) => {
    try {
      const data = await callGet(
        `/api/admin/clients/${client_id}/quotations`,
        `page=1&page_size=10`,
      );
      console.log('거래처 견적서 조회 : ', data);
    } catch (error) {
      console.error(error);
    }
  };

  // 견적서 기간에 따른 조회
  const handleInquiryClientQuotationDate = async (client_id: string) => {
    try {
      const data = await callGet(
        `/api/admin/clients/${client_id}/quotations/date`,
        `date_range_type=week&start_date=2024-08-04&end_date=2024-08-07&page=1&page_size=10`,
      );
      console.log('견적서 기간에 따른 조회 : ', data);
    } catch (error) {
      console.error(error);
    }
  };

  // 거래처 주문 내역 조회
  const handleInquiryClientPastOrder = async (client_id: string) => {
    try {
      const data = await callGet(`/api/order/${client_id}/get-past-order`);
      console.log('거래처 주문 내역 조회 : ', data);
    } catch (error) {
      console.error(error);
    }
  };

  // 거래처 해당 날짜 견적서 제출 여부 파악
  const handleCheckClientQuotation = async (client_id: string) => {
    try {
      const data = await callGet(
        `/api/admin/clients/${client_id}/check`,
        `input_date=2024-08-07`,
      );
      console.log('거래처 해당 날짜 견적서 제출 여부 파악 : ', data);
    } catch (error) {
      console.error(error);
    }
  };

  // 거래처 지역 선택
  const handleSetClientRegion = async (client_id: string) => {
    try {
      const data = await callPatch(
        `/api/admin/clients/${client_id}/region`,
        `region=의정부`,
      );
      console.log('거래처 지역 선택', data);
    } catch (error) {
      console.error(error);
    }
  };

  // 거래처 특이사항 작성
  const handleClientComment = async (client_id: string) => {
    try {
      const data = await callPatch(
        `/api/admin/clients/${client_id}/comment`,
        `input_comment=안녕`,
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 거래처 삭제
  const handleDeleteClient = async (client_id: string) => {
    try {
      const data = await callDelete(`/api/admin/clients/${client_id}/delete`);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <div>관리자 페이지</div>

      <p>거래처 견적서 조회</p>
      <div className="flex-center flex-col gap-6">
        <Input
          className="bg-gray-0 p-3"
          type="default"
          onChange={handleInputChange}
          textValue={state.clientId}
          placeholder="거래처 아이디 입력"
        />

        <Button
          className="border-2"
          buttonText="거래처 견적서 조회"
          type="default"
          onClickHandler={() => handleInquiryClientQuotation(state.clientId)}
        />
        <Button
          className="border-2"
          buttonText="거래처 견적서 기간에 따른 조회"
          type="default"
          onClickHandler={() =>
            handleInquiryClientQuotationDate(state.clientId)
          }
        />
        <Button
          className="border-2"
          buttonText="거래처 주문 내역 조회"
          type="default"
          onClickHandler={() => handleInquiryClientPastOrder(state.clientId)}
        />
        <Button
          className="border-2"
          buttonText="거래처 해당 날짜 견적서 제출 여부 파악"
          type="default"
          onClickHandler={() => handleCheckClientQuotation(state.clientId)}
        />
        <Button
          className="border-2"
          buttonText="거래처 지역 선택"
          type="default"
          onClickHandler={() => handleSetClientRegion(state.clientId)}
        />
        <Button
          className="border-2"
          buttonText="거래처 특이사항 작성"
          type="default"
          onClickHandler={() => handleClientComment(state.clientId)}
        />
        <Button
          className="border-2 border-red-1"
          buttonText="거래처 삭제"
          type="default"
          onClickHandler={() => handleDeleteClient(state.clientId)}
        />
      </div>

      <div className="mt-12 border-4 border-gray-7 w-full" />

      <p>물품 관리</p>
      <div className="flex-center flex-col gap-6" />
    </div>
  );
}
