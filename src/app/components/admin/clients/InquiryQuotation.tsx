import { callGet } from '@/app/utils/callApi';
import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { formatNumber } from '../../../utils/formatPrice';
import { clientStatusMapping } from '@/app/constants/admin';

export default function InquiryQuotation({ clientId }: ClientIdProps) {
  const [page, setPage] = useState('1');
  const [pageSize, setPageSize] = useState('10');
  const [result, setResult] = useState<{ result: { items: AdminItemProps[] } }>(
    { result: { items: [] } },
  );

  const handleGetQuotations = async () => {
    try {
      const data = await callGet(
        `/api/admin/clients/${clientId}/quotations`,
        `page=${page}&page_size=${pageSize}`,
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
          onClickHandler={handleGetQuotations}
        />
      </div>
      <div className="w-full">{renderTable()}</div>
    </div>
  );
}
