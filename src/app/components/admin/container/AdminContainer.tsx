'use client';

import { callDelete, callGet, callPatch } from '@/app/utils/callApi';
import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';

export default function AdminContainer() {
  const [state, setState] = useState({
    clientId: '',
    selectedOption: '',
    result: '',
    page: '',
    pageSize: '',
    startDate: '',
    endDate: '',
    inputDate: '',
    region: '',
    inputComment: '',
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

  const handleButtonClick = async () => {
    const {
      clientId,
      selectedOption,
      page,
      pageSize,
      startDate,
      endDate,
      inputDate,
      region,
      inputComment,
    } = state;
    try {
      let data;
      switch (selectedOption) {
        case 'inquiryQuotation':
          data = await callGet(
            `/api/admin/clients/${clientId}/quotations`,
            `page=${page}&page_size=${pageSize}`,
          );
          break;
        case 'inquiryQuotationDate':
          data = await callGet(
            `/api/admin/clients/${clientId}/quotations/date`,
            `date_range_type=custom&start_date=${startDate}&end_date=${endDate}&page=${page}&page_size=${pageSize}`,
          );
          break;
        case 'inquiryPastOrder':
          data = await callGet(`/api/order/${clientId}/get-past-order`);
          break;
        case 'checkQuotation':
          data = await callGet(
            `/api/admin/clients/${clientId}/check`,
            `input_date=${inputDate}`,
          );
          break;
        case 'setRegion':
          data = await callPatch(
            `/api/admin/clients/${clientId}/region`,
            `region=${region}`,
          );
          break;
        case 'setComment':
          data = await callPatch(
            `/api/admin/clients/${clientId}/comment`,
            `input_comment=${inputComment}`,
          );
          break;
        case 'deleteClient':
          data = await callDelete(`/api/admin/clients/${clientId}/delete`);
          break;
        default:
          throw new Error('Invalid option');
      }
      console.log(data);

      setState((prev) => ({
        ...prev,
        result: JSON.stringify(data, null, 2),
      }));
    } catch (error) {
      console.error(error);
      setState((prev) => ({
        ...prev,
        result: 'An error occurred. Please check the console for more details.',
      }));
    }
  };

  const renderTable = () => {
    const data = JSON.parse(state.result);
    if (
      ['inquiryQuotation', 'inquiryQuotationDate'].includes(
        state.selectedOption,
      ) &&
      data.result.items
    ) {
      return (
        <table className="table-auto border-collapse border border-gray-3">
          <thead>
            <tr>
              <th className="border border-gray-3 px-4 py-2">번호</th>
              <th className="border border-gray-3 px-4 py-2">이름</th>
              <th className="border border-gray-3 px-4 py-2">생성일</th>
              <th className="border border-gray-3 px-4 py-2">수정일</th>
              <th className="border border-gray-3 px-4 py-2">상태</th>
              <th className="border border-gray-3 px-4 py-2">가격</th>
            </tr>
          </thead>
          <tbody>
            {data.result.items.map((item: AdminItemProps) => (
              <tr key={item.id}>
                <td className="border border-gray-3 px-4 py-2">{item.id}</td>
                <td className="border border-gray-3 px-4 py-2">{item.name}</td>
                <td className="border border-gray-3 px-4 py-2">
                  {item.created_at}
                </td>
                <td className="border border-gray-3 px-4 py-2">
                  {item.updated_at || 'N/A'}
                </td>
                <td className="border border-gray-3 px-4 py-2">
                  {item.status}
                </td>
                <td className="border border-gray-3 px-4 py-2">
                  {item.total_price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    if (
      state.selectedOption === 'inquiryPastOrder' &&
      Array.isArray(data.result)
    ) {
      return (
        <table className="table-auto border-collapse border border-gray-3">
          <thead>
            <tr>
              <th className="border border-gray-3 px-4 py-2">번호</th>
              <th className="border border-gray-3 px-4 py-2">이름</th>
            </tr>
          </thead>
          <tbody>
            {data.result.map((item: AdminItemProps) => (
              <tr key={item.id}>
                <td className="border border-gray-3 px-4 py-2">
                  {item.past_order_id}
                </td>
                <td className="border border-gray-3 px-4 py-2">{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    if (state.selectedOption === 'checkQuotation' && data.result) {
      return (
        <table className="table-auto border-collapse border border-gray-3">
          <thead>
            <tr>
              <th className="border border-gray-3 px-4 py-2">번호</th>
              <th className="border border-gray-3 px-4 py-2">상태</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-3 px-4 py-2">
                {data.result.client_id}
              </td>
              <td className="border border-gray-3 px-4 py-2">
                {data.result.status ? '제출' : '미제출'}
              </td>
            </tr>
          </tbody>
        </table>
      );
    }

    return null;
  };

  return (
    <div className="p-8">
      <div>관리자 페이지</div>

      <div className="flex-center flex-col gap-6">
        <select
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

        {['inquiryQuotation', 'inquiryQuotationDate'].includes(
          state.selectedOption,
        ) && (
          <>
            <Input
              name="page"
              className="bg-gray-0 p-3"
              type="default"
              onChange={handleInputChange}
              textValue={state.page}
              placeholder="페이지"
            />
            <Input
              name="pageSize"
              className="bg-gray-0 p-3"
              type="default"
              onChange={handleInputChange}
              textValue={state.pageSize}
              placeholder="페이지 크기"
            />
          </>
        )}

        {state.selectedOption === 'inquiryQuotationDate' && (
          <>
            <Input
              name="startDate"
              className="bg-gray-0 p-3"
              inputType="date"
              type="default"
              onChange={handleInputChange}
              textValue={state.startDate}
              placeholder="시작 날짜"
            />
            <Input
              name="endDate"
              className="bg-gray-0 p-3"
              inputType="date"
              type="default"
              onChange={handleInputChange}
              textValue={state.endDate}
              placeholder="종료 날짜"
            />
          </>
        )}

        {state.selectedOption === 'checkQuotation' && (
          <Input
            name="inputDate"
            className="bg-gray-0 p-3"
            inputType="date"
            onChange={handleInputChange}
            textValue={state.inputDate}
            placeholder="날짜 입력"
            type="default"
          />
        )}

        {state.selectedOption === 'setRegion' && (
          <select
            name="region"
            onChange={handleSelectChange}
            value={state.region}
          >
            <option value="">지역을 선택하세요</option>
            <option value="노원">노원</option>
            <option value="의정부">의정부</option>
            <option value="강남">강남</option>
            <option value="건대">건대</option>
            <option value="신촌">신촌</option>
          </select>
        )}

        {state.selectedOption === 'setComment' && (
          <Input
            name="inputComment"
            className="bg-gray-0 p-3"
            type="default"
            onChange={handleInputChange}
            textValue={state.inputComment}
            placeholder="특이사항 입력"
          />
        )}

        <Input
          name="clientId"
          className="bg-gray-0 p-3"
          type="default"
          onChange={handleInputChange}
          textValue={state.clientId}
          placeholder="거래처 아이디 입력"
        />

        <Button
          className="border-2"
          buttonText="실행"
          type="default"
          onClickHandler={handleButtonClick}
        />

        <pre> {renderTable()}</pre>
      </div>
    </div>
  );
}
