import { callGet } from '@/app/utils/callApi';
import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { clientStatusMapping } from '@/app/constants/admin';
import { formatNumber } from '@/app/utils/formatPrice';

export default function InquiryQuotationDate({ clientId }: ClientIdProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState('1');
  const [pageSize, setPageSize] = useState('10');
  const [result, setResult] = useState<{ result: { items: AdminItemProps[] } }>(
    { result: { items: [] } },
  );

  const handleGetQuotationsByDate = async () => {
    try {
      const data = await callGet(
        `/api/admin/clients/${clientId}/quotations/date`,
        `date_range_type=custom&start_date=${startDate}&end_date=${endDate}&page=${page}&page_size=${pageSize}`,
      );
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ result: { items: [] } });
    }
  };

  const renderTable = () => {
    return (
      <table className="admin-table">
        <thead>
          <tr>
            <th className="admin-table-th">번호</th>
            <th className="admin-table-th">이름</th>
            <th className="admin-table-th">생성일</th>
            <th className="admin-table-th">수정일</th>
            <th className="admin-table-th">상태</th>
            <th className="admin-table-th">가격</th>
          </tr>
        </thead>
        <tbody>
          {result.result.items.map((item: AdminItemProps) => (
            <tr key={item.id}>
              <td className="admin-table-th">{item.id}</td>
              <td className="admin-table-th">{item.name}</td>
              <td className="admin-table-th">{item.created_at}</td>
              <td className="admin-table-th">{item.updated_at || 'N/A'}</td>
              <td className="admin-table-th">
                {clientStatusMapping[item.status]}
              </td>
              <td className="admin-table-th">
                {formatNumber(item.total_price)} 원
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="flex flex-col gap-4 border-2 p-8">
      <div className="flex w-full gap-12">
        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">시작 날짜</p>
          <Input
            name="startDate"
            className="admin-input"
            inputType="date"
            type="default"
            onChange={(e) => setStartDate(e.target.value)}
            textValue={startDate}
            placeholder="시작 날짜"
          />
        </div>

        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">종료 날짜</p>
          <Input
            name="endDate"
            className="admin-input"
            inputType="date"
            type="default"
            onChange={(e) => setEndDate(e.target.value)}
            textValue={endDate}
            placeholder="종료 날짜"
          />
        </div>

        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">페이지</p>
          <Input
            name="page"
            className="admin-input"
            type="default"
            onChange={(e) => setPage(e.target.value)}
            textValue={page}
            placeholder="페이지"
          />
        </div>

        <div className="flex gap-4 items-center">
          <p className="whitespace-nowrap">페이지 크기</p>
          <Input
            name="pageSize"
            className="admin-input"
            type="default"
            onChange={(e) => setPageSize(e.target.value)}
            textValue={pageSize}
            placeholder="페이지 크기"
          />
        </div>

        <Button
          className="admin-btn"
          buttonText="실행"
          type="default"
          onClickHandler={handleGetQuotationsByDate}
        />
      </div>
      {renderTable()}
    </div>
  );
}
