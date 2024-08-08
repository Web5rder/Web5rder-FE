'use client';

import { useState } from 'react';
import CheckQuotation from '../clients/CheckQuotation';
import DeleteClient from '../clients/DeleteClient';
import InquiryPastOrder from '../clients/InquiryPastOrder';
import InquiryQuotation from '../clients/InquiryQuotation';
import InquiryQuotationDate from '../clients/InquiryQuotationDate';
import SetComment from '../clients/SetComment';
import SetRegion from '../clients/SetRegion';
import Input from '../../common/Input';

export default function AdminContainer() {
  const [state, setState] = useState({
    clientId: '',
    selectedOption: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderComponent = () => {
    switch (state.selectedOption) {
      case 'inquiryQuotation':
        return <InquiryQuotation clientId={state.clientId} />;
      case 'inquiryQuotationDate':
        return <InquiryQuotationDate clientId={state.clientId} />;
      case 'inquiryPastOrder':
        return <InquiryPastOrder clientId={state.clientId} />;
      case 'checkQuotation':
        return <CheckQuotation clientId={state.clientId} />;
      case 'setRegion':
        return <SetRegion clientId={state.clientId} />;
      case 'setComment':
        return <SetComment clientId={state.clientId} />;
      case 'deleteClient':
        return <DeleteClient clientId={state.clientId} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 border border-gray-2">
      <div className="flex items-center gap-4 h-16 border-2 px-4 mb-8">
        <p>옵션을 선택하세요</p>
        <select
          className="border-2"
          name="selectedOption"
          onChange={handleSelectChange}
          value={state.selectedOption}
        >
          <option value="">옵션을 선택하세요</option>
          <option value="inquiryQuotation">거래처 견적서 조회</option>
          <option value="inquiryQuotationDate">
            거래처 견적서 기간에 따른 조회
          </option>
          <option value="inquiryPastOrder">거래처 주문 내역 조회</option>
          <option value="checkQuotation">
            거래처 해당 날짜 견적서 제출 여부 파악
          </option>
          <option value="setRegion">거래처 지역 선택</option>
          <option value="setComment">거래처 특이사항 작성</option>
          <option value="deleteClient">거래처 삭제</option>
        </select>

        <div className="flex gap-4">
          <p>거래처 id</p>
          <Input
            name="clientId"
            className="bg-gray-0 w-fit border border-gray-7 px-4"
            type="default"
            onChange={handleInputChange}
            textValue={state.clientId}
            placeholder="거래처 아이디 입력"
          />
        </div>
      </div>

      {renderComponent()}
    </div>
  );
}
